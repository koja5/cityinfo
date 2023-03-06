import { Component, OnInit } from '@angular/core';
import { UploadingEventArgs } from '@syncfusion/ej2-angular-inputs';
import { getUniqueID } from '@syncfusion/ej2-base';
import { ToastrComponent } from 'src/app/components/dynamic-component/common/toastr/toastr.component';
import { UploadModel } from 'src/app/models/upload-model';
import { UserAdsModel } from 'src/app/models/user-ads-model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.scss'],
})
export class UserAdsComponent implements OnInit {
  public asyncSettings!: Object;
  public data = new UserAdsModel();
  public config = new UploadModel();
  public path = 'upload-config';
  public file = 'upload-cover-image.json';

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
  }

  executeAction() {}

  initializeConfig() {
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
    console.log(this.data);
    this.data.id_user = this.helpService.getUserId();
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
      } else {
        this.toastr.showErrorCustom('Not successfuly created new ads draft!');
      }
    }, 500);
  }
}
