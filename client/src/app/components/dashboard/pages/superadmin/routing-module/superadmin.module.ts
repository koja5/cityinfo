import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesComponent } from '../cities/cities.component';
import { DynamicModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic/dynamic.module';
import { SuperadminRouting } from './superadmin-routing';
import { UsersComponent } from '../users/users.component';
import { DistrictsComponent } from '../district/districts.component';
import { PositionPriceComponent } from '../position-price/position-price.component';
import { RequestAdsComponent } from '../request-ads/request-ads.component';
import { AllAdsComponent } from '../all-ads/all-ads.component';
import { AdCardComponent } from 'src/app/components/templates/ad-card/ad-card.component';
import { PreviewAdComponent } from '../preview-ad/preview-ad.component';
import { SharingModule } from 'src/app/sharing.module';
import { AllInvoicesComponent } from '../all-invoices/all-invoices.component';
import { AllEventsComponent } from '../all-events/all-events.component';
import { AllPlacesComponent } from '../all-places/all-places.component';
import { CategoriesComponent } from '../categories/categories.component';

@NgModule({
  declarations: [
    CitiesComponent,
    UsersComponent,
    DistrictsComponent,
    PositionPriceComponent,
    RequestAdsComponent,
    AllAdsComponent,
    PreviewAdComponent,
    AllInvoicesComponent,
    AllEventsComponent,
    AllPlacesComponent,
    CategoriesComponent,
  ],
  imports: [CommonModule, SuperadminRouting, DynamicModule, SharingModule],
  providers: [],
})
export class SuperadminModule {}
