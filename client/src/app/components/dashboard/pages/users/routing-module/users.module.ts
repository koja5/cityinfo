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
import {
  DateTimePicker,
  DateTimePickerAllModule,
} from '@syncfusion/ej2-angular-calendars';
import { PlacesComponent } from '../places/places.component';
import { SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { UserEventsComponent } from '../user-events/user-events.component';
import { PaidEventsComponent } from '../paid-events/paid-events.component';
import { DialogConfirmComponent } from 'src/app/components/common/dialog-confirm/dialog-confirm.component';
import { ComboBoxAllModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    UserAdsComponent,
    PaidAdsComponent,
    UserEventsComponent,
    PaidEventsComponent,
    MyInvoicesComponent,
    PlacesComponent
  ],
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
    DateTimePickerAllModule,
    SwitchAllModule,
    ComboBoxAllModule
  ],
  providers: [],
})
export class UsersModule {}
