import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuardSuperadminService } from 'src/app/services/login-guard/logged-guard-superadmin.service';
import { LoggedGuardUserService } from 'src/app/services/login-guard/logged-guard-user.service';
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
    canActivate: [LoggedGuardSuperadminService],
    loadChildren: () =>
      import(
        '../pages/superadmin/routing-module/superadmin.module'
      ).then((m) => m.SuperadminModule),
  },
  {
    path: 'user',
    canActivate: [LoggedGuardUserService],
    loadChildren: () =>
      import(
        '../pages/users/routing-module/users.module'
      ).then((m) => m.UsersModule),
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
