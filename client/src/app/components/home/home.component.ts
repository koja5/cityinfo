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
  public selectedCity: any;
  public language: any;
  public year!: number;
  public showCookieMessage = false;
  public loader = false;

  constructor(
    private service: CallApiService,
    private helpService: HelpService,
    private configurationService: ConfigurationService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.initializeConfig();
    this.initializeData();
  }

  initializeConfig() {
    this.configurationService.getLanguage().subscribe((data) => {
      this.language = data;
      this.helpService.setLanguage(data);
    });

    if (this.helpService.getLocalStorageStringValue('selectedCity')) {
      this.selectedCity =
        this.helpService.getLocalStorageStringValue('selectedCity');
    }

    if (!this.storageService.getCookie('cookie')) {
      this.showCookieMessage = true;
    }
  }

  initializeData() {
    this.service.callGetMethod('api/getCities', '').subscribe((data) => {
      this.listOfCities = data;
    });

    if (this.selectedCity) {
      this.getAllData(
        'getPaidAdsByCity',
        'getPaidEventsByCity',
        this.selectedCity
      );
    } else {
      this.getAllData('getPaidAdsForAllCity', 'getPaidEventsForAllCity', '');
    }
  }

  showHideMobileMenu() {
    if (this.showHideMenu === '') {
      this.showHideMenu = 'block';
    } else {
      this.showHideMenu = '';
    }
  }

  changeCity(event: any) {
    this.helpService.setLocalStorage('selectedCity', event.target.value);
    if (event.target.value != '') {
      this.allAds = [];
      this.allFixedAds = null;
      this.getAllData(
        'getPaidAdsByCity',
        'getPaidEventsByCity',
        event.target.value
      );
    } else {
      this.getAllData('getPaidAdsForAllCity', 'getPaidEventsForAllCity', '');
    }
  }

  getAllData(methodForAds: string, methodForEvents: string, parameter: string) {
    this.loader = true;
    this.service
      .callGetMethod('api/' + methodForAds, parameter)
      .subscribe((ads: any) => {
        this.service
          .callGetMethod('api/' + methodForEvents, parameter)
          .subscribe((events: any) => {
            console.log(ads);
            console.log(events);
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
            this.loader = false;
          });
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
