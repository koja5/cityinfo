import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadingEventArgs } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { getUniqueID } from '@syncfusion/ej2-base';
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
  public loaderData = false;
  public cities: any;

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

    this.getMyPlaces();
    this.getCities();
  }

  getMyPlaces() {
    this.service.callGetMethod('api/getMyPlaces', '').subscribe((data: any) => {
      this.listOfPlaces = data as PlacesModel[];
      this.loaderData = false;
    });
  }

  getCities() {
    this.service.callGetMethod('api/getCities', '').subscribe((data: any) => {
      this.cities = data;
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
          this.dialog.hide();
          this.toastr.showError();
        }
      });
  }
}
