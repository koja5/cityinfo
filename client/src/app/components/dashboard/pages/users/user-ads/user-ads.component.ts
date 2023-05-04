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
  @ViewChild('dialogEvent') dialogEvent!: DialogComponent;
  public asyncAdsSettings!: Object;
  public asyncEventsSettings!: Object;
  public data = new AdsModel();
  public event = new EventsModel();
  public configAds = new UploadModel();
  public configEvents = new UploadModel();
  public path = 'upload-config';
  public file = 'upload-cover-image.json';
  public fileEvent = 'upload-cover-image-events.json';
  public listOfDrafts: any;
  public editButton: boolean = false;
  public dialogPosition: Object = {
    X: 'center',
    Y: 'center',
  };
  public language: any;
  public isClub: boolean = false;

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
    if (this.isClub) {
      this.service
        .callGetMethod('api/getEventsDraft', '')
        .subscribe((data: any) => {
          this.listOfDrafts = data as EventsModel[];
        });
    } else {
      this.service.callGetMethod('api/getMyAds', '').subscribe((data: any) => {
        this.listOfDrafts = data as AdsModel[];
      });
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

    if (this.isClub) {
      this.configurationService
        .getConfiguration(this.path, this.fileEvent)
        .subscribe((data) => {
          this.configEvents = data;
          this.initializeEventsSettings();
        });
    } else {
      this.configurationService
        .getConfiguration(this.path, this.file)
        .subscribe((data) => {
          this.configAds = data;
          this.initializeAdsSettings();
        });
    }
  }

  initializeAdsSettings() {
    this.asyncAdsSettings = {
      saveUrl: this.configAds.saveUrl,
      removeUrl: this.configAds.removeUrl,
    };
  }

  initializeEventsSettings() {
    this.asyncEventsSettings = {
      saveUrl: this.configEvents.saveUrl,
      removeUrl: this.configEvents.removeUrl,
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

  public onUploadBeginEvents(args: UploadingEventArgs) {
    this.event.id_user = this.helpService.getUserId();
    this.editButton = false;
    let newName: string = getUniqueID(
      args.fileData.name.substring(0, args.fileData.name.lastIndexOf('.'))
    );
    args.customFormData = [
      {
        fileName: newName,
      },
      {
        additionalData: this.event ? JSON.stringify(this.event) : '',
      },
    ];
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
    this.fillAdFields();
    this.editButton = false;
  }

  createNewEventDraft() {
    this.dialogEvent.show();
    this.event = new EventsModel();
    this.fillEventFields();
    this.editButton = false;
  }

  fillAdFields() {
    this.service.callGetMethod('api/getMe', '').subscribe((data: any) => {
      if (data) {
        this.data = {
          name: data[0].nameOfOrganization,
          phone: data[0].phone,
          email: data[0].email,
        };
      }
    });
  }

  fillEventFields() {
    this.service.callGetMethod('api/getMe', '').subscribe((data: any) => {
      if (data) {
        this.event = {
          name: data[0].nameOfOrganization,
          phone: data[0].phone,
          email: data[0].email,
        };
      }
    });
  }

  clickEmitter(event: EmitterModel) {
    console.log(event);
    if (event.operation === ActionsType.edit) {
      this.editButton = true;
      if (this.isClub) {
        this.event = event.data;
        this.dialogEvent.show();
      } else {
        this.data = event.data;
        this.dialog.show();
      }
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
    if (this.isClub) {
      this.service
        .callPostMethod('api/updateEventDraft', this.event)
        .subscribe((data) => {
          if (data) {
            this.dialogEvent.hide();
            this.toastr.showSuccessCustom('You successfuly update ads draft!');
          } else {
            this.dialogEvent.hide();
            this.toastr.showErrorCustom('Not successfuly update ads draft!');
          }
        });
    } else {
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
}
