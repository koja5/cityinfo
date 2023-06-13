import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadingEventArgs } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { getUniqueID } from '@syncfusion/ej2-base';
import { UUID } from 'angular2-uuid';
import {
  DOC_ORIENTATION,
  DataUrl,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrComponent } from 'src/app/components/dynamic-component/common/toastr/toastr.component';
import { ActionsType } from 'src/app/enums/actions-type';
import { EmitterModel } from 'src/app/models/emitter-model';
import { PlacesModel } from 'src/app/models/places-model';
import { UploadModel } from 'src/app/models/upload-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  @ViewChild('dialog') dialog!: DialogComponent;
  public asyncAdsSettings!: Object;
  public asyncEventsSettings!: Object;
  public data = new PlacesModel();
  public currentData = new PlacesModel();
  public configPlaces = new UploadModel();
  public path = 'upload-config';
  public file = 'upload-cover-image-places.json';
  public listOfPlaces: any;
  public editButton: boolean = false;
  public dialogPosition: Object = {
    X: 'center',
    Y: 'center',
  };
  public language: any;
  public isClub: boolean = false;
  public loader = false;
  public loaderData = false;
  public cities: any;
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
    this.loaderData = true;

    this.getMyPlaces();
    this.getCities();
    this.getCategories();
  }

  getMyPlaces() {
    this.service.callGetMethod('api/getMyPlaces', '').subscribe((data: any) => {
      this.listOfPlaces = data as PlacesModel[];
      this.listOfPlaces = this.helpService.convertStringToIntegerArray(
        this.listOfPlaces
      );
      this.loaderData = false;
    });
  }

  getCities() {
    this.service.callGetMethod('api/getCities', '').subscribe((data: any) => {
      this.cities = data;
    });
  }

  getCategories() {
    this.service.callGetMethod('api/getCategories', '').subscribe((data) => {
      this.categories = data;
    });
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

    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.configPlaces = data;
        this.initializePlacesSettings();
      });
  }

  initializePlacesSettings() {
    this.asyncAdsSettings = {
      saveUrl: this.configPlaces.saveUrl,
      removeUrl: this.configPlaces.removeUrl,
    };
  }

  createNewPlace() {
    this.dialog.show();
    this.data = new PlacesModel();
    this.imgChangeEvt = '';
    this.coverImage = '';
    this.editButton = false;
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

  clickEmitter(event: EmitterModel) {
    if (event.operation === ActionsType.edit) {
      this.editButton = true;
      this.data = event.data;
      if (this.data.active) {
        this.data.active = true;
      } else {
        this.data.active = false;
      }
      this.coverImage = event.data.cover;
      this.currentData = JSON.parse(JSON.stringify(event.data));
      this.dialog.show();
    } else if (event.operation === ActionsType.delete) {
      this.service
        .callPostMethod('api/deletePlace', event.data)
        .subscribe((data) => {
          if (data) {
            this.intializeData();
            this.toastr.showSuccess();
          } else {
            this.dialog.hide();
            this.toastr.showError();
          }
        });
    } else if (event.operation == ActionsType.deactiveCampaign) {
      event.data.active = 0;
      this.service
        .callPostMethod('api/updatePlaceActive', event.data)
        .subscribe((data) => {
          if (data) {
            this.intializeData();
            this.toastr.showSuccess();
          } else {
            this.toastr.showError();
          }
        });
    } else if (event.operation == ActionsType.activeCampaign) {
      event.data.active = 1;
      this.service
        .callPostMethod('api/updatePlaceActive', event.data)
        .subscribe((data) => {
          if (data) {
            this.intializeData();
            this.toastr.showSuccess();
          } else {
            this.toastr.showError();
          }
        });
    }
  }

  editPlace() {
    this.service
      .callPostMethod('api/updatePlace', this.data)
      .subscribe((data) => {
        if (data) {
          this.getMyPlaces();
          this.dialog.hide();
          this.toastr.showSuccess();
        } else {
          this.toastr.showError();
        }
      });
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
    if (JSON.stringify(this.currentData) != JSON.stringify(this.data)) {
      if (this.cropImgPreview) {
        this.data.cover = this.coverPath + UUID.UUID() + '.webp';
      }

      if (!this.editButton) {
        this.service
          .callPostMethod('api/createPlace', this.data)
          .subscribe((data) => {
            if (data) {
              this.uploadCoverImage();
            } else {
              this.toastr.showError();
            }
          });
      } else {
        this.service
          .callPostMethod('api/updatePlace', this.data)
          .subscribe((data) => {
            if (data) {
              this.uploadCoverImage();
            } else {
              this.toastr.showError();
            }
          });
      }
    }
  }

  uploadCoverImage() {
    if (this.cropImgPreview) {
      const formData: FormData = new FormData();

      const imageBlob = this.helpService.dataURItoBlob(
        this.cropImgPreview.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
      );
      const imageFile = new File([imageBlob], this.data.cover!, {
        type: 'image/png',
      });

      formData.append('file', imageFile);
      this.loader = true;
      this.service
        .callPostMethod('/api/upload/uploadCoverImage', formData)
        .subscribe((data) => {
          this.loader = false;
          if (data) {
            this.getMyPlaces();
            this.dialog.hide();
            this.toastr.showSuccess();
          } else {
            this.toastr.showError();
          }
        });
    } else {
      this.getMyPlaces();
      this.dialog.hide();
      this.toastr.showSuccess();
    }
    this.imgChangeEvt = '';
    this.cropImgPreview = null;
  }

  compressFile() {
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation, fileName }: UploadResponse) => {
        console.log('File Name:', fileName);
        console.log(
          `Original: ${image.substring(0, 50)}... (${image.length} characters)`
        );
        console.log('Size in bytes was:', this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 50, 50)
          .then((result: DataUrl) => {
            console.log(
              `Compressed: ${result.substring(0, 50)}... (${
                result.length
              } characters)`
            );
            console.log(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );
            this.imgChangeEvt = result;
            return result;
          });
      });
  }
}
