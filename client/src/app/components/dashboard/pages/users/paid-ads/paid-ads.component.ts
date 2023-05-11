import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastrComponent } from 'src/app/components/dynamic-component/common/toastr/toastr.component';
import { FormConfig } from 'src/app/components/dynamic-component/dynamic-forms/models/form-config';
import { ActionsType } from 'src/app/enums/actions-type';
import { DecisionType } from 'src/app/enums/decision-type';
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
  @ViewChild('dialogChange') dialogChange!: DialogComponent;
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('card') card!: DialogComponent;
  public path = '/forms/user';
  public file = 'paid-ads.json';
  public fileChangeDraft = 'paid-ads-draft-change.json';
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
  public changeData: any;
  public adPreview = false;
  public loader = false;
  public loaderData = false;
  public currentOperation!: ActionsType;

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
    this.loaderData = true;
    this.service.callGetMethod('api/getPaidAdsByUser', '').subscribe((data) => {
      this.listOfPaid = data;
      this.loaderData = false;
    });
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
    if (this.helpService.getLanguage()) {
      this.language = this.helpService.getLanguage();
    } else {
      this.configurationService.getLanguage().subscribe((data) => {
        this.language = data;
      });
    }
  }

  createNew() {
    this.dialog.show();
  }

  setStripeToken(token: stripe.Token) {
    if (token) {
      this.paymentInformation.token = token;
      this.paymentInformation.price = this.paidAd.price;
      this.paymentInformation.description =
        this.helpService.getPaymentDescription('Ad', this.data, this.user);
      this.paymentInformation.app_token = this.storageService.getToken();

      if (this.changeData) {
        this.paymentInformation.action_type = ActionsType.edit;
      } else {
        this.paymentInformation.action_type = ActionsType.create;
      }

      this.loader = true;
      this.service
        .callPostMethod('/api/createAdPayment', this.paymentInformation)
        .subscribe((data) => {
          if (data) {
            this.card.hide();
            this.dialog.hide();
            this.dialogChange.hide();
            this.toastr.showSuccessCustom(this.language.successfullyPaidAd, '');
            this.loader = false;
            this.intializeData();
          }
        });
    }
  }

  clickEmitter(event: any) {
    this.config = new FormConfig();
    this.changeData = null;
    this.currentOperation = event.operation;

    if (event.operation == ActionsType.promotion) {
      this.configurationService
        .getConfiguration(this.path, this.file)
        .subscribe((data) => {
          this.config = data;
          this.changeData = event.data;
          setTimeout(() => {
            this.dialogChange.show();
          }, 50);
        });
    } else if (event.operation == ActionsType.delete) {
      this.service
        .callPostMethod('api/deletePaidAd', event.data)
        .subscribe((data) => {
          if (data) {
            this.intializeData();
            this.toastr.showSuccess();
          } else {
            this.dialog.hide();
            this.toastr.showError();
          }
        });
    } else if (event.operation == ActionsType.edit) {
      this.configurationService
        .getConfiguration(this.path, this.fileChangeDraft)
        .subscribe((data) => {
          this.config = data;
          this.changeData = event.data;
          setTimeout(() => {
            this.dialogChange.show();
          }, 50);
        });
    } else if (event.operation == ActionsType.deactiveCampaign) {
      event.data.active = 0;
      this.service
        .callPostMethod('api/updatePaidAdActive', event.data)
        .subscribe((data) => {
          if (data) {
            this.intializeData();
            this.toastr.showSuccess();
          } else {
            this.dialog.hide();
            this.toastr.showError();
          }
        });
    } else if (event.operation == ActionsType.activeCampaign) {
      event.data.active = 1;
      this.service
        .callPostMethod('api/updatePaidAdActive', event.data)
        .subscribe((data) => {
          if (data) {
            this.intializeData();
            this.toastr.showSuccess();
          } else {
            this.dialog.hide();
            this.toastr.showError();
          }
        });
    }
  }

  submitEmitter(event: any) {
    if (this.currentOperation == ActionsType.edit) {
      this.service
        .callPostMethod('api/updatePaidAd', event)
        .subscribe((data) => {
          if (data) {
            this.intializeData();
            this.toastr.showSuccess();
          } else {
            this.dialogChange.hide();
            this.toastr.showError();
          }
        });
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
              id: event.id,
            };
            this.paymentInformation = {
              ad_date: ad_date,
            };
            this.adPreview = true;
            this.card.show();
          }
        });
    }
  }

  setStripeSource(source: stripe.Source) {
    console.log('Stripe Source', source);
  }

  paymentDialogClose() {
    this.adPreview = false;
  }
}
