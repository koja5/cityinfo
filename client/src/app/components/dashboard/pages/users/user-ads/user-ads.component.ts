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

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.scss'],
})
export class UserAdsComponent implements OnInit {
  @ViewChild('dialog') dialog!: DialogComponent;
  public asyncSettings!: Object;
  public data = new AdsModel();
  public config = new UploadModel();
  public path = 'upload-config';
  public file = 'upload-cover-image.json';
  public listOfAds: AdsModel[] = [];
  public editButton: boolean = false;
  public dialogPosition: Object = {
    X: 'center',
    Y: 'center',
  };
  public language: any;

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private toastr: ToastrComponent,
    private service: CallApiService
  ) {}

  ngOnInit(): void {
    this.intializeData();
    this.initializeConfig();
  }

  onBeforeOpen(args: any) {
    args.maxHeight = null;
  }

  executeAction() {}

  intializeData() {
    this.service
      .callGetMethod('api/getMyAds', '')
      .subscribe((data: AdsModel) => {
        this.listOfAds = data as AdsModel[];
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
        this.config = data;
        this.initializeSettings();
      });
  }

  initializeSettings() {
    this.asyncSettings = {
      saveUrl: this.config.saveUrl,
      removeUrl: this.config.removeUrl,
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
    console.log(args);

    setTimeout(() => {
      if (args.currentRequest?.status == 200) {
        this.toastr.showSuccessCustom('You successfuly created new ads draft!');
        window.location.reload();
      } else {
        this.toastr.showErrorCustom('Not successfuly created new ads draft!');
      }
    }, 500);
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
    this.editButton = false;
  }

  clickEmitter(event: EmitterModel) {
    console.log(event);
    this.data = event.data;
    if (event.operation === ActionsType.edit) {
      this.editButton = true;
      this.dialog.show();
    } else if (event.operation === ActionsType.delete) {
      this.service
        .callPostMethod('api/deleteMyAds', this.data)
        .subscribe((data) => {
          if (data) {
            this.dialog.hide();
            this.toastr.showSuccessCustom('You successfuly delete ads draft!');
          } else {
            this.dialog.hide();
            this.toastr.showErrorCustom('Not successfuly delete ads draft!');
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
          this.toastr.showSuccessCustom('You successfuly update ads draft!');
        } else {
          this.dialog.hide();
          this.toastr.showErrorCustom('Not successfuly update ads draft!');
        }
      });
  }
}
