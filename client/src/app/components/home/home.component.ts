import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showHideMenu = '';
  public listOfCities: any;
  public allAds: any = [];
  public allFixedAds: any = [];
  public allData: any;
  public selectedCityId: any;
  public selectedCity: any;
  public language: any;
  public year!: number;
  public showCookieMessage = false;
  public loader = false;
  public value: number = 30;
  public rangeValue: any;
  public categories: any;
  public ranges = [
    {
      text: '5 km',
      value: 5,
    },
    {
      text: '10 km',
      value: 10,
    },
    {
      text: '15 km',
      value: 15,
    },
    {
      text: '20 km',
      value: 20,
    },
    {
      text: '25 km',
      value: 25,
    },
    {
      text: '50 km',
      value: 50,
    },
    {
      text: '100 km',
      value: 100,
    },
  ];

  constructor(
    private service: CallApiService,
    private helpService: HelpService,
    private configurationService: ConfigurationService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
    this.initializeData();
    this.navigatorInit();
  }

  initializeConfig() {
    this.configurationService.getLanguage().subscribe((data) => {
      this.language = data;
      this.helpService.setLanguage(data);
    });

    if (
      this.helpService.getLocalStorageStringValue('selectedCity') &&
      this.helpService.getLocalStorageStringValue('selectedCity') != 'null' &&
      this.helpService.getLocalStorageStringValue('selectedCity') != 'undefined'
    ) {
      this.selectedCity = this.helpService.getLocalStorage('selectedCity');
      this.selectedCityId = this.selectedCity.id;
    }

    if (!this.storageService.getCookie('cookie')) {
      this.showCookieMessage = true;
    }

    if (
      this.helpService.getLocalStorageStringValue('range') &&
      this.helpService.getLocalStorageStringValue('range') != 'null' &&
      this.helpService.getLocalStorageStringValue('range') != 'undefined'
    ) {
      this.rangeValue = Number(
        this.helpService.getLocalStorageStringValue('range')
      );
    }
  }

  initializeData() {
    this.getAllCities();
    this.getCategories();

    if (this.selectedCityId && this.rangeValue) {
      this.setNewRange({ value: this.rangeValue });
    } else if (this.selectedCityId) {
      this.getAllData(
        'getPaidAdsByCity',
        'getPaidEventsByCity',
        'getPlacesByCity',
        this.selectedCityId
      );
    } else {
      this.getAllData(
        'getPaidAdsForAllCity',
        'getPaidEventsForAllCity',
        'getPlacesForAllCity',
        ''
      );
    }

  }

  navigatorInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
    });
  }

  showHideMobileMenu() {
    if (this.showHideMenu === '') {
      this.showHideMenu = 'block';
    } else {
      this.showHideMenu = '';
    }
  }

  changeCity(event: any) {
    if (event.value == null) {
      this.helpService.removeLocalStorageItem('range');
      this.rangeValue = null;
    }
    this.selectedCity = event.itemData;
    this.helpService.setLocalStorage(
      'selectedCity',
      JSON.stringify(event.itemData)
    );
    if (this.rangeValue) {
      this.setNewRange({ value: this.rangeValue });
    } else {
      this.showEntriesForSelectedCity(event.value);
    }
  }

  setNewRange(event: any) {
    this.selectedCity['range'] = event.value;
    this.rangeValue = event.value;
    this.helpService.setLocalStorage('range', this.rangeValue);
    this.loader = true;
    this.service
      .callPostMethod('/api/calculateRange', this.selectedCity)
      .subscribe((data: any) => {
        console.log(data);
        this.packAdsAndEvents(data.ads, data.events);
        this.allData = data.places;
        this.allData = this.allData.concat(this.allAds);
        this.loader = false;
      });
  }

  showEntriesForSelectedCity(value: any) {
    if (value) {
      this.allAds = [];
      this.allFixedAds = null;
      this.getAllData(
        'getPaidAdsByCity',
        'getPaidEventsByCity',
        'getPlacesByCity',
        value
      );
    } else {
      this.getAllData(
        'getPaidAdsForAllCity',
        'getPaidEventsForAllCity',
        'getPlacesForAllCity',
        ''
      );
    }
  }

  getAllData(
    methodForAds: string,
    methodForEvents: string,
    methodForPlaces: string,
    parameter: string
  ) {
    this.allData = null;
    this.loader = true;
    this.service
      .callGetMethod('api/' + methodForAds, parameter)
      .subscribe((ads: any) => {
        this.service
          .callGetMethod('api/' + methodForEvents, parameter)
          .subscribe((events: any) => {
            this.packAdsAndEvents(ads, events);

            this.service
              .callGetMethod('api/' + methodForPlaces, parameter)
              .subscribe((place) => {
                this.allData = place;
                this.allData = this.allData.concat(this.allAds);
                this.loader = false;
              });
          });
      });
  }

  getCategories() {
    this.service.callGetMethod('api/getCategories', '').subscribe((data) => {
      this.categories = data;
    });
  }

  packAdsAndEvents(ads: any, events: any) {
    this.allAds = [];
    const numberOfFixedPositionForAds =
      this.getNumberOfFixedPositionForAds(ads);
    const numberOfFixedPositionForEvents =
      this.getNumberOfFixedPositionForEvents(events);
    this.allAds = this.allAds.concat(
      ads.splice(0, numberOfFixedPositionForAds)
    );
    this.allAds = this.allAds.concat(
      events.splice(0, numberOfFixedPositionForEvents)
    );
    this.allAds = this.allAds.concat(ads.splice(0, ads.length));
    this.allAds = this.allAds.concat(events.splice(0, events.length));
  }

  getAllCities() {
    this.service.callGetMethod('api/getCities', '').subscribe((data) => {
      this.listOfCities = data;
    });
  }

  getPaidAdsByCity(parameter: string) {
    this.service
      .callGetMethod('api/getPaidAdsByCity', parameter)
      .subscribe((data: any) => {
        if (this.allAds) {
          this.allAds = this.allAds.concat(data);
        } else {
          this.allAds = data;
        }
        this.packForTopPosition();
        this.packAllOther();
      });
  }

  getPaidEventsByCity(parameter: string) {
    this.service
      .callGetMethod('api/getPaidEventsByCity', parameter)
      .subscribe((data: any) => {
        if (this.allAds) {
          this.allAds = this.allAds.concat(data);
        } else {
          this.allAds = data;
        }
        this.packForTopPosition();
        this.packAllOther();
      });
  }

  packForTopPosition() {
    for (let i = 0; i < this.allAds.length; i++) {
      if (
        this.allAds[i].position == 1 &&
        new Date(this.allAds[i].expired_date) > new Date()
      ) {
        this.allFixedAds.push(this.allAds[i]);
        this.allAds.splice(i, 1);
      }
    }
  }

  packAllOther() {
    this.allFixedAds = this.allFixedAds.concat(this.allAds);
  }

  getPaidFixedAdsByCity(parameter: string) {}

  getPaidScrollEventsByCity(parameter: string) {
    this.service
      .callGetMethod('api/getPaidScrollEventsByCity', parameter)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.allAds = this.allAds.concat(data);
        }
      });
  }

  getNumberOfFixedPositionForAds(ads: any) {
    let count = 0;
    for (let i = 0; i < ads.length; i++) {
      if (ads[i].position == 1) {
        count++;
      }
    }
    return count;
  }

  getNumberOfFixedPositionForEvents(events: any) {
    let count = 0;
    for (let i = 0; i < events.length; i++) {
      if (new Date(events[i].expired_date) > new Date()) {
        count++;
      }
    }
    return count;
  }

  hideCookieMessage() {
    this.showCookieMessage = false;
  }
}
