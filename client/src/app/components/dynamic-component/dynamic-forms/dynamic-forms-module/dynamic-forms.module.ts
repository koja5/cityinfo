import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldsDirective } from '../dynamic-fields/dynamic-fields.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
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

@NgModule({
  declarations: [
    DynamicFieldsDirective,
    TextBoxComponent,
    LabelComponent,
    ButtonComponent,
    DynamicIconComponent
  ],
  exports: [
    DynamicFieldsDirective,
    TextBoxComponent,
    LabelComponent,
    ButtonComponent,
    DynamicIconComponent
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
    MatIconModule
  ],
  entryComponents: [
    DynamicFieldsDirective,
    TextBoxComponent,
    LabelComponent,
    ButtonComponent,
    DynamicIconComponent
  ],
})
export class DynamicFormsModule {}
