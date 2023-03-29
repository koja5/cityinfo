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
  public leftFixedAds: any;
  public rightFixedAds: any;
  public selectedCity: any;
  public language: any;

  constructor(
    private service: CallApiService,
    private helpService: HelpService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
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
      this.leftFixedAds = null;
      this.rightFixedAds = null;
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
        }
      });
  }

  getPaidFixedAdsByCity(parameter: string) {
    this.service
      .callGetMethod('api/getPaidFixedAdsByCity', parameter)
      .subscribe((data: any) => {
        if (data.length > 1) {
          this.leftFixedAds = data.slice(0, data.length / 2);

          if (data.length > 1) {
            this.rightFixedAds = data.slice(data.length / 2, data.length);
          } else {
            this.rightFixedAds = data;
          }
        } else {
          this.leftFixedAds = data;
        }
      });
  }

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
