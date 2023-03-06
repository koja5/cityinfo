import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldsDirective } from '../dynamic-fields/dynamic-fields.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericTextBoxModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
  ButtonModule,
  CheckBoxModule,
  RadioButtonModule,
  SwitchModule,
} from '@syncfusion/ej2-angular-buttons';
import { TextBoxComponent } from '../dynamic-fields/inputs/text-box/text-box.component';
import { LabelComponent } from '../dynamic-fields/label/label.component';
import { ButtonComponent } from '../dynamic-fields/buttons/button/button.component';
import { DynamicIconComponent } from '../../common/dynamic-icon/dynamic-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSvgComponent } from 'src/app/components/common/loader-svg/loader-svg.component';
import { SharingModule } from 'src/app/sharing.module';
import { ComboboxComponent } from '../dynamic-fields/dropdowns/combobox/combobox.component';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DatepickerComponent } from '../dynamic-fields/inputs/datepicker/datepicker.component';
import { NumericTextboxComponent } from '../dynamic-fields/inputs/numeric-textbox/numeric-textbox.component';

@NgModule({
  declarations: [
    DynamicFieldsDirective,
    TextBoxComponent,
    LabelComponent,
    ButtonComponent,
    DynamicIconComponent,
    ComboboxComponent,
    DatepickerComponent,
    NumericTextboxComponent
  ],
  exports: [
    DynamicFieldsDirective,
    TextBoxComponent,
    LabelComponent,
    ButtonComponent,
    DynamicIconComponent,
    ComboboxComponent,
    DatepickerComponent,
    NumericTextboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    CheckBoxModule,
    RadioButtonModule,
    SwitchModule,
    MatIconModule,
    SharingModule,
    ComboBoxModule,
    DatePickerModule,
    NumericTextBoxModule
  ],
  entryComponents: [
    DynamicFieldsDirective,
    TextBoxComponent,
    LabelComponent,
    ButtonComponent,
    DynamicIconComponent,
    ComboboxComponent,
    DatepickerComponent,
    NumericTextboxComponent
  ],
})
export class DynamicFormsModule {}
