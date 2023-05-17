import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadingEventArgs } from '@syncfusion/ej2-angular-inputs';
import { getUniqueID } from '@syncfusion/ej2-base';
import { ToastrComponent } from 'src/app/components/dynamic-component/common/toastr/toastr.component';
import { UploadModel } from 'src/app/models/upload-model';
import { AdsModel } from 'src/app/models/ads-model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitterModel } from 'src/app/models/emitter-model';
import { ActionsType } from 'src/app/enums/actions-type';
import { EventsModel } from 'src/app/models/events-model';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.scss'],
})
export class UserAdsComponent implements OnInit {
  @ViewChild('dialog') dialog!: DialogComponent;
  public asyncAdsSettings!: Object;
  public data = new AdsModel();
  public configAds = new UploadModel();
  public path = 'upload-config';
  public file = 'upload-cover-image.json';
  public listOfDrafts: any;
  public editButton: boolean = false;
  public dialogPosition: Object = {
    X: 'center',
    Y: 'center',
  };
  public language: any;
  public loaderData = false;

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private toastr: ToastrComponent,
    private service: CallApiService
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
    this.service.callGetMethod('api/getMyAds', '').subscribe((data: any) => {
      this.listOfDrafts = data as AdsModel[];
      this.loaderData = false;
    });
  }

  initializeConfig() {
    if (this.helpService.getLanguage()) {
      this.language = this.helpService.getLanguage();
    } else {
      this.configurationService.getLanguage().subscribe((data) => {
        this.language = data;
      });
    }

    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.configAds = data;
        this.initializeAdsSettings();
      });
  }

  initializeAdsSettings() {
    this.asyncAdsSettings = {
      saveUrl: this.configAds.saveUrl,
      removeUrl: this.configAds.removeUrl,
    };
  }

  public onUploadBegin(args: UploadingEventArgs) {
    this.data.id_user = this.helpService.getUserId();
    this.editButton = false;
    let newName: string = getUniqueID(
      args.fileData.name.substring(0, args.fileData.name.lastIndexOf('.'))
    );
    args.customFormData = [
      {
        fileName: newName,
      },
      {
        additionalData: this.data ? JSON.stringify(this.data) : '',
      },
    ];

    setTimeout(() => {
      if (args.currentRequest?.status == 200) {
        this.toastr.showSuccess();
        window.location.reload();
      } else {
        this.toastr.showError();
        window.location.reload();
      }
    }, 800);
  }
  changesFile(event: any) {
    this.editButton = false;
  }

  clearingFile(event: any) {
    this.editButton = true;
  }

  createNewAdDraft() {
    this.dialog.show();
    this.data = new AdsModel();
    this.fillAdFields();
    this.editButton = false;
  }

  fillAdFields() {
    this.service.callGetMethod('api/getMe', '').subscribe((data: any) => {
      if (data) {
        this.data = {
          phone: data[0].phone,
          email: data[0].email,
        };
      }
    });
  }

  clickEmitter(event: EmitterModel) {
    if (event.operation === ActionsType.edit) {
      this.editButton = true;
      this.data = event.data;
      this.dialog.show();
    } else if (event.operation === ActionsType.delete) {
      this.service
        .callPostMethod('api/deleteMyAds', this.data)
        .subscribe((data) => {
          if (data) {
            this.dialog.hide();
            this.toastr.showSuccess();
          } else {
            this.dialog.hide();
            this.toastr.showError();
          }
        });
    }
  }

  editAd() {
    this.service
      .callPostMethod('api/updateMyAds', this.data)
      .subscribe((data) => {
        if (data) {
          this.dialog.hide();
          this.toastr.showSuccess();
        } else {
          this.dialog.hide();
          this.toastr.showError();
        }
      });
  }
}
