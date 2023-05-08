import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyInvoicesComponent } from '../my-invoices/my-invoices.component';
import { PaidAdsComponent } from '../paid-ads/paid-ads.component';
import { UserAdsComponent } from '../user-ads/user-ads.component';
import { PlacesComponent } from '../places/places.component';
import { UserEventsComponent } from '../user-events/user-events.component';
import { PaidEventsComponent } from '../paid-events/paid-events.component';

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
    path: 'my-events',
    component: UserEventsComponent,
  },
  {
    path: 'paid-ads',
    component: PaidAdsComponent,
  },
  {
    path: 'paid-events',
    component: PaidEventsComponent,
  },
  {
    path: 'my-invoices',
    component: MyInvoicesComponent,
  },
  {
    path: 'places',
    component: PlacesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRouting {}
