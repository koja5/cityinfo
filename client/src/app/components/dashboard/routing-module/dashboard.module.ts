import { NgModule } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { DashboardRouting } from './dashboard-routing';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { DynamicModule } from '../../dynamic-component/dynamic-module/dynamic/dynamic.module';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [DashboardComponent, NavigationComponent],
  imports: [
    CommonModule,
    DashboardRouting,
    DynamicModule,
    DropDownButtonModule,
    ImageCropperModule,
  ],
  providers: [],
})
export class DashboardModule {}
