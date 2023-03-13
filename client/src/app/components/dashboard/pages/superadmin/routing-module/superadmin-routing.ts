import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAdsComponent } from '../all-ads/all-ads.component';
import { CitiesComponent } from '../cities/cities.component';
import { DistrictsComponent } from '../district/districts.component';
import { PositionPriceComponent } from '../position-price/position-price.component';
import { RequestAdsComponent } from '../request-ads/request-ads.component';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'cities',
    component: CitiesComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'districts',
    component: DistrictsComponent,
  },
  {
    path: 'position-prices',
    component: PositionPriceComponent,
  },
  {
    path: 'request-ads',
    component: RequestAdsComponent,
  },
  {
    path: 'all-ads',
    component: AllAdsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminRouting {}
