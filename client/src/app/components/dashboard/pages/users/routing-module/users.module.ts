import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdsComponent } from '../user-ads/user-ads.component';
import { UsersRouting } from './users-routing';
import { FormsModule } from '@angular/forms';
import {
  TextBoxAllModule,
  UploaderModule,
} from '@syncfusion/ej2-angular-inputs';
import { DynamicModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic/dynamic.module';
import { PaidAdsComponent } from '../paid-ads/paid-ads.component';
import { SharingModule } from 'src/app/sharing.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { StripeModule } from 'stripe-angular';
import { MyInvoicesComponent } from '../my-invoices/my-invoices.component';
import { DateTimePicker, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [UserAdsComponent, PaidAdsComponent, MyInvoicesComponent],
  imports: [
    CommonModule,
    UsersRouting,
    FormsModule,
    TextBoxAllModule,
    UploaderModule,
    DynamicModule,
    SharingModule,
    DialogModule,
    StripeModule.forRoot(
      'pk_test_51LhYhHL4uVudLiXA5WwSojoMtx6m0rOM7fufOkPllausovqA0BhBJ0Id0ROuRb336IVLZMjshamhIIOlT1hFOAAS00zH00KnIN'
    ),
    DateTimePickerAllModule
  ],
  providers: [],
})
export class UsersModule {}
