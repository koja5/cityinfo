import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { UploadsComponent } from '../pages/users/uploads/uploads.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'superadmin',
    pathMatch: 'full',
  },
  {
    path: 'uploads',
    component: UploadsComponent,
  },
  {
    path: 'superadmin',
    loadChildren: () =>
      import(
        '../pages/superadmin/routing-module/superadmin.module'
      ).then((m) => m.SuperadminModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import(
        '../pages/profile-settings/routing-module/profile-settings.module'
      ).then((m) => m.ProfileSettingsdModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouting {}
