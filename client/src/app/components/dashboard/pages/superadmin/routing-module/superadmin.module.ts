import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesComponent } from '../cities/cities.component';
import { DynamicModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic/dynamic.module';
import { SuperadminRouting } from './superadmin-routing';
import { UsersComponent } from '../users/users.component';
import { DistrictsComponent } from '../district/districts.component';
import { PositionPriceComponent } from '../position-price/position-price.component';

@NgModule({
  declarations: [CitiesComponent, UsersComponent, DistrictsComponent, PositionPriceComponent],
  imports: [CommonModule, SuperadminRouting, DynamicModule],
  providers: [],
})
export class SuperadminModule {}
