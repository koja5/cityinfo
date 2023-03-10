import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showHideMenu = '';
  public listOfCities: any;
  public allAds: any;
  public selectedCity: any;

  constructor(
    private service: CallApiService,
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    if (this.helpService.getLocalStorageStringValue('selectedCity')) {
      this.selectedCity =
        this.helpService.getLocalStorageStringValue('selectedCity');
    }
    this.initializeData();
  }

  initializeData() {
    this.service.callGetMethod('api/getCities', '').subscribe((data) => {
      this.listOfCities = data;
    });

    if (this.selectedCity) {
      this.service
        .callGetMethod('api/getPaidAdsByCity', this.selectedCity)
        .subscribe((data) => {
          this.allAds = data;
        });
    } else {
      this.service.callGetMethod('api/getPaidAds', '').subscribe((data) => {
        this.allAds = data;
      });
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
    this.service
      .callGetMethod('api/getPaidAdsByCity', event.target.value)
      .subscribe((data) => {
        this.allAds = data;
      });
  }
}
