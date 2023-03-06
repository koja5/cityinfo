import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdsComponent } from '../user-ads/user-ads.component';
import { UsersRouting } from './users-routing';
import { FormsModule } from '@angular/forms';
import { TextBoxAllModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DynamicModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic/dynamic.module';
import { PaidAdsComponent } from '../paid-ads/paid-ads.component';

@NgModule({
  declarations: [UserAdsComponent, PaidAdsComponent],
  imports: [CommonModule, UsersRouting, FormsModule, TextBoxAllModule, UploaderModule, DynamicModule],
  providers: [],
})
export class UsersModule {}
