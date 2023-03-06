import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CallApiService } from './services/call-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharingModule } from './sharing.module';
import { DynamicModule } from './components/dynamic-component/dynamic-module/dynamic/dynamic.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AdCardComponent } from './components/home/ad-card/ad-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharingModule,
    DynamicModule,
    BrowserAnimationsModule
  ],
  providers: [CallApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
