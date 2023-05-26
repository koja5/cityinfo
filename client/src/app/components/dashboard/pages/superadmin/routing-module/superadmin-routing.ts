import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAdsComponent } from '../all-ads/all-ads.component';
import { AllEventsComponent } from '../all-events/all-events.component';
import { AllInvoicesComponent } from '../all-invoices/all-invoices.component';
import { CitiesComponent } from '../cities/cities.component';
import { DistrictsComponent } from '../district/districts.component';
import { PositionPriceComponent } from '../position-price/position-price.component';
import { PreviewAdComponent } from '../preview-ad/preview-ad.component';
import { RequestAdsComponent } from '../request-ads/request-ads.component';
import { UsersComponent } from '../users/users.component';
import { AllPlacesComponent } from '../all-places/all-places.component';
import { CategoriesComponent } from '../categories/categories.component';

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
  {
    path: 'all-events',
    component: AllEventsComponent,
  },
  {
    path: 'preview-ad/:id',
    component: PreviewAdComponent,
  },
  {
    path: 'all-invoices',
    component: AllInvoicesComponent,
  },
  {
    path: 'all-places',
    component: AllPlacesComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminRouting {}
