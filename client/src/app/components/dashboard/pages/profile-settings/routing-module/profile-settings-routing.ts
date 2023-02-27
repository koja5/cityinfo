import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePersonalInfoComponent } from '../change-personal-info/change-personal-info.component';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileSettingsComponent
  },
  {
    path: 'change-personal-info',
    component: ChangePersonalInfoComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSettingsRouting {}
