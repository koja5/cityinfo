import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showHideMenu = '';
  public listOfCities: any;
  public allAds: any = [];
  public allFixedAds: any;
  public selectedCity: any;
  public language: any;
  public year!: number;

  constructor(
    private service: CallApiService,
    private helpService: HelpService,
    private configurationService: ConfigurationService
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
  }

  initializeData() {
    this.service.callGetMethod('api/getCities', '').subscribe((data) => {
      this.listOfCities = data;
    });

    if (this.selectedCity) {
      this.getPaidScrollAdsByCity(this.selectedCity);
      this.getPaidFixedAdsByCity(this.selectedCity);
      this.getPaidScrollEventsByCity(this.selectedCity);
    } else {
      this.getPaidScrollAdsByCity('');
      this.getPaidFixedAdsByCity('');
      this.getPaidScrollEventsByCity('');
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
    if (event.target.value != '') {
      this.helpService.setLocalStorage('selectedCity', event.target.value);
      this.allAds = [];
      this.allFixedAds = null;
      this.getPaidScrollAdsByCity(event.target.value);
      this.getPaidFixedAdsByCity(event.target.value);
      this.getPaidScrollEventsByCity(event.target.value);
    }
  }

  getPaidScrollAdsByCity(parameter: string) {
    this.service
      .callGetMethod('api/getPaidScrollAdsByCity', parameter)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.allAds = this.allAds.concat(data);
          this.service
            .callGetMethod('api/getPaidFixedAdsByCity', parameter)
            .subscribe((data: any) => {
              if (data.length > 1) {
                this.allFixedAds = data;
                if (this.allFixedAds.length % 4 === 3) {
                  var scrollAd = this.allAds.splice(0, 1);
                  this.allFixedAds = this.allFixedAds.concat(scrollAd);
                }
              }
            });
        }
      });
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
}
