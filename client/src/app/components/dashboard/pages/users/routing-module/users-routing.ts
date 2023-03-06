import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidAdsComponent } from '../paid-ads/paid-ads.component';
import { UserAdsComponent } from '../user-ads/user-ads.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-ads',
    pathMatch: 'full',
  },
  {
    path: 'my-ads',
    component: UserAdsComponent,
  },
  {
    path: 'paid-ads',
    component: PaidAdsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRouting {}
