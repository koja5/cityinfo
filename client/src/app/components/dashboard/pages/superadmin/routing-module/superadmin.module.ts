import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesComponent } from '../cities/cities.component';
import { DynamicModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic/dynamic.module';
import { SuperadminRouting } from './superadmin-routing';
import { UsersComponent } from '../users/users.component';

@NgModule({
  declarations: [CitiesComponent, UsersComponent],
  imports: [CommonModule, SuperadminRouting, DynamicModule],
  providers: [],
})
export class SuperadminModule {}
