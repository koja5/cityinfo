import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsRouting } from './profile-settings-routing';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';
import { DynamicModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic/dynamic.module';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePersonalInfoComponent } from '../change-personal-info/change-personal-info.component';

@NgModule({
  declarations: [
    ProfileSettingsComponent,
    ChangePersonalInfoComponent,
    ChangePasswordComponent,
  ],
  imports: [CommonModule, ProfileSettingsRouting, DynamicModule],
  providers: [],
})
export class ProfileSettingsdModule {}
