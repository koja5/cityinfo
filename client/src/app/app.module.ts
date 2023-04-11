import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { FormsModule } from '@angular/forms';
import { CallApiService } from './services/call-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharingModule } from './sharing.module';
import { DynamicModule } from './components/dynamic-component/dynamic-module/dynamic/dynamic.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { DynamicTextFormComponent } from './components/dynamic-component/dynamic-text-form/dynamic-text-form.component';
import { ImpressumComponent } from './components/home/pages/impressum/impressum.component';
import { TermsComponent } from './components/home/pages/terms/terms.component';
import { RightOfWithdrawalComponent } from './components/home/pages/right-of-withdrawal/right-of-withdrawal.component';
import { PrivacyPolicyComponent } from './components/home/pages/privacy-policy/privacy-policy.component';
import { NavigationComponent } from './components/home/parts/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ImpressumComponent,
    TermsComponent,
    RightOfWithdrawalComponent,
    PrivacyPolicyComponent,
    DynamicTextFormComponent,
    NavigationComponent
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
    BrowserAnimationsModule,
    CheckBoxModule
  ],
  providers: [CallApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
