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
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import {
  DOC_ORIENTATION,
  DataUrl,
  NgxImageCompressService,
} from 'ngx-image-compress';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss'],
})
export class UserEventsComponent implements OnInit {
  @ViewChild('dialogEvent') dialogEvent!: DialogComponent;
  public asyncEventsSettings!: Object;
  public event = new EventsModel();
  public configEvents = new UploadModel();
  public path = 'upload-config';
  public fileEvent = 'upload-cover-image-events.json';
  public listOfDrafts: any;
  public editButton: boolean = false;
  public dialogPosition: Object = {
    X: 'center',
    Y: 'center',
  };
  public language: any;
  public loader = false;
  public loaderData = false;
  public categories: any;
  public coverPath = './assets/file_upload/';
  public coverImage!: string;
  public imgChangeEvt!: string;
  public cropImgPreview!: any;
  public acceptTermsAndPrivacy!: boolean;
  public imageWarranty!: boolean;

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private toastr: ToastrComponent,
    private service: CallApiService,
    private http: HttpClient,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
    this.intializeData();
  }

  onBeforeOpen(args: any) {
    args.maxHeight = null;
  }

  intializeData() {
    this.getEventsDraft();
    this.getCategories();
  }

  getEventsDraft() {
    this.loaderData = true;
    this.service
      .callGetMethod('api/getEventsDraft', '')
      .subscribe((data: any) => {
        this.listOfDrafts = data as EventsModel[];
        this.listOfDrafts = this.helpService.convertStringToIntegerArray(
          this.listOfDrafts
        );
        this.loaderData = false;
      });
  }

  getCategories() {
    this.service.callGetMethod('api/getCategories', '').subscribe((data) => {
      this.categories = data;
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
      .getConfiguration(this.path, this.fileEvent)
      .subscribe((data) => {
        this.configEvents = data;
        this.initializeEventsSettings();
      });
  }

  initializeEventsSettings() {
    this.asyncEventsSettings = {
      saveUrl: this.configEvents.saveUrl,
      removeUrl: this.configEvents.removeUrl,
    };
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

    if (args.currentRequest?.status == 200) {
      this.toastr.showSuccess();
      // window.location.reload();
    } else {
      this.toastr.showError();
      // window.location.reload();
    }
  }

  changesFile(event: any) {
    this.editButton = false;
  }

  clearingFile(event: any) {
    this.editButton = true;
  }

  createNewEventDraft() {
    this.dialogEvent.show();
    this.event = new EventsModel();
    this.imgChangeEvt = '';
    this.coverImage = '';
    this.fillEventFields();
    this.editButton = false;
  }

  fillEventFields() {
    this.service.callGetMethod('api/getMe', '').subscribe((data: any) => {
      if (data) {
        this.event = {
          phone: data[0].phone,
          email: data[0].email,
        };
      }
    });
  }

  clickEmitter(event: EmitterModel) {
    if (event.operation === ActionsType.edit) {
      this.editButton = true;
      this.event = event.data;
      this.coverImage = event.data.cover;
      this.dialogEvent.show();
    }
  }

  /* CROPPER */

  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }

  cropImg(e: ImageCroppedEvent) {
    this.imageCompress
      .compressFile(e.base64!, DOC_ORIENTATION.Default, 50, 50)
      .then((result: DataUrl) => {
        this.coverImage = result;
        this.cropImgPreview = result;
      });
  }

  imgLoad() {}
  initCropper() {}

  imgFailed() {}

  removeImage() {
    this.cropImgPreview = null;
    this.imgChangeEvt = '';
    this.coverImage = '';
  }

  saveEntry() {
    if (this.cropImgPreview) {
      this.event.cover = this.coverPath + UUID.UUID() + '.webp';
    }

    if (!this.editButton) {
      this.service
        .callPostMethod('api/createEventDraft', this.event)
        .subscribe((data) => {
          if (data) {
            this.uploadCoverImage();
          } else {
            this.toastr.showError();
          }
        });
    } else {
      this.service
        .callPostMethod('api/updateEventDraft', this.event)
        .subscribe((data) => {
          if (data) {
            this.uploadCoverImage();
          } else {
            this.toastr.showError();
          }
        });
    }
  }

  uploadCoverImage() {
    if (this.cropImgPreview) {
      const formData: FormData = new FormData();

      const imageBlob = this.helpService.dataURItoBlob(
        this.cropImgPreview.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
      );
      const imageFile = new File([imageBlob], this.event.cover!, {
        type: 'image/png',
      });

      formData.append('file', imageFile);

      this.loader = true;

      this.service
        .callPostMethod('/api/upload/uploadCoverImage', formData)
        .subscribe((data) => {
          this.loader = false;
          if (data) {
            this.getEventsDraft();
            this.dialogEvent.hide();
            this.toastr.showSuccess();
          } else {
            this.toastr.showError();
          }
        });
    } else {
      this.getEventsDraft();
      this.dialogEvent.hide();
      this.toastr.showSuccess();
    }
    this.imgChangeEvt = '';
    this.cropImgPreview = null;
  }
}
