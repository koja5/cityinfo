import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastrComponent } from 'src/app/components/dynamic-component/common/toastr/toastr.component';
import { FormConfig } from 'src/app/components/dynamic-component/dynamic-forms/models/form-config';
import { AdsModel } from 'src/app/models/ads-model';
import { EmitterModel } from 'src/app/models/emitter-model';
import { EventsModel } from 'src/app/models/events-model';
import { PaidAdsModel } from 'src/app/models/paid-ads-model';
import { PaymentAdsModel } from 'src/app/models/payment-ads-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-paid-ads',
  templateUrl: './paid-ads.component.html',
  styleUrls: ['./paid-ads.component.scss'],
})
export class PaidAdsComponent implements OnInit {
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('dialogEvent') dialogEvent!: DialogComponent;
  @ViewChild('card') card!: DialogComponent;
  public path = '/forms/user';
  public file!: string;
  public dialogPosition: Object = {
    X: 'center',
    Y: 'center',
  };
  public language: any;
  public listOfPaid: any;
  public expiredDate: any;
  public config!: FormConfig;
  cardCaptureReady = false;
  public data = new AdsModel();
  public paidAd = new PaidAdsModel();
  public paymentInformation = new PaymentAdsModel();
  public user: any;
  public isClub: boolean = false;

  constructor(
    private service: CallApiService,
    private helpService: HelpService,
    private configurationService: ConfigurationService,
    private toastr: ToastrComponent,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
    this.intializeData();
  }

  onBeforeOpen(args: any) {
    args.maxHeight = null;
  }

  intializeData() {
    if (this.isClub) {
      this.service
        .callGetMethod('api/getPaidEventsByUser', '')
        .subscribe((data) => {
          this.listOfPaid = data;
        });
    } else {
      this.service
        .callGetMethod('api/getPaidAdsByUser', '')
        .subscribe((data) => {
          this.listOfPaid = data;
        });
    }
  }

  checkExpiredDate() {
    for (let i = 0; i < this.listOfPaid; i++) {
      if (new Date(this.listOfPaid[i].expired_date) >= new Date()) {
        this.expiredDate[this.listOfPaid[i].id] = false;
      } else {
        this.expiredDate[this.listOfPaid[i].id] = true;
      }
    }
  }

  initializeConfig() {
    this.isClub = this.helpService.checkAccountIsClub();

    if (this.helpService.getLanguage()) {
      this.language = this.helpService.getLanguage();
    } else {
      this.configurationService.getLanguage().subscribe((data) => {
        this.language = data;
      });
    }

    if (this.helpService.checkAccountIsClub()) {
      this.file = 'paid-events.json';
    } else {
      this.file = 'paid-ads.json';
    }
  }

  createNewPaidAd() {
    this.dialog.show();
    // this.data = new AdsModel();
  }

  createNewPaidEvent() {
    this.dialogEvent.show();
  }

  submitEmitter(event: any) {
    if (this.helpService.checkAccountIsClub()) {
      if (event.start_date_top && event.number_of_weeks) {
        this.service.callGetMethod('api/getMe', '').subscribe((data: any) => {
          if (data) {
            this.user = data[0];
          }
        });
        this.service
          .callPostMethod('/api/getEventInformationForPayment', event)
          .subscribe((data: any) => {
            if (data) {
              this.data = data[0];
              this.paidAd = {
                position: data[0].position,
                city: data[0].city,
                number_of_weeks: event.number_of_weeks,
                price: event.number_of_weeks * data[0].price,
                start_date: event.start_date,
                expired_date: data[0].expired_date,
              };
              let event_date = new EventsModel();
              event_date = {
                start_date: event.start_date,
                event_draft: event.event_draft,
                city: event.city,
                position: event.position,
                number_of_weeks: event.number_of_weeks,
                active: 1,
              };
              this.paymentInformation = {
                event_date: event_date,
              };
              this.card.show();
            }
          });
      } else {
        this.service
          .callPostMethod('api/createPaidEvent', event)
          .subscribe((data) => {
            if (data) {
              this.toastr.showSuccess();
              this.dialogEvent.hide();
              this.intializeData();
            } else {
              this.toastr.showError();
            }
          });
      }
    } else {
      this.service.callGetMethod('api/getMe', '').subscribe((data: any) => {
        if (data) {
          this.user = data[0];
        }
      });
      this.service
        .callPostMethod('/api/getAdInformationForPayment', event)
        .subscribe((data: any) => {
          if (data) {
            this.data = data[0];
            this.paidAd = {
              position: data[0].position,
              city: data[0].city,
              number_of_weeks: event.number_of_weeks,
              price: event.number_of_weeks * data[0].price,
              start_date: event.start_date,
              expired_date: data[0].expired_date,
            };
            let ad_date = new PaidAdsModel();
            ad_date = {
              start_date: event.start_date,
              ads_draft: event.ads_draft,
              city: event.city,
              position: event.position,
              number_of_weeks: event.number_of_weeks,
              active: 1,
            };
            this.paymentInformation = {
              ad_date: ad_date,
            };
            this.card.show();
          }
        });
    }
  }

  onStripeInvalid(error: Error) {
    console.log('Validation Error', error);
  }

  onStripeError(error: Error) {
    console.error('Stripe error', error);
  }

  setPaymentMethod(token: stripe.paymentMethod.PaymentMethod) {
    console.log('Stripe Payment Method', token);
  }

  setStripeToken(token: stripe.Token) {
    if (token) {
      let typeOfAd = '';
      if (this.helpService.checkAccountIsClub()) {
        typeOfAd = 'Event';
      } else {
        typeOfAd = 'Ad';
      }
      this.paymentInformation.token = token;
      this.paymentInformation.price = this.paidAd.price;
      this.paymentInformation.description =
        this.getPaymentDescription(typeOfAd);
      this.paymentInformation.app_token = this.storageService.getToken();
      if (this.helpService.checkAccountIsClub()) {
        this.service
          .callPostMethod('/api/createEventPayment', this.paymentInformation)
          .subscribe((data) => {
            if (data) {
              this.card.hide();
              this.dialogEvent.hide();
              this.toastr.showSuccessCustom(
                this.language.successfullyPaidAd,
                ''
              );
              this.intializeData();
            }
          });
      } else {
        this.service
          .callPostMethod('/api/createAdPayment', this.paymentInformation)
          .subscribe((data) => {
            if (data) {
              this.card.hide();
              this.dialog.hide();
              this.toastr.showSuccessCustom(
                this.language.successfullyPaidAd,
                ''
              );
              this.intializeData();
            }
          });
      }
    }
  }

  getPaymentDescription(typeOfAd: string) {
    return (
      'CityInfo: Type of Ad: ' +
      typeOfAd +
      ', Id: ' +
      this.data.id +
      ', Name: ' +
      this.data.name +
      ', Customer name: ' +
      this.user.firstname +
      ', Email: ' +
      this.user.email +
      ', Phone: ' +
      this.user.phone
    );
  }

  setStripeSource(source: stripe.Source) {
    console.log('Stripe Source', source);
  }
}
