import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login/login.component';
import { ErrorPageComponent } from './components/templates/message-pages/error-page/error-page.component';
import { SuccessPageComponent } from './components/templates/message-pages/success-page/success-page.component';
import { LoggedGuardService } from './services/login-guard/logged-guard.service';
import { LoginGuardService } from './services/login-guard/login-guard.service';
import { ImpressumComponent } from './components/home/pages/impressum/impressum.component';
import { RightOfWithdrawalComponent } from './components/home/pages/right-of-withdrawal/right-of-withdrawal.component';
import { TermsComponent } from './components/home/pages/terms/terms.component';
import { PrivacyPolicyComponent } from './components/home/pages/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    canActivate: [LoggedGuardService],
    component: LoginComponent,
  },
  {
    path: 'forgot-password/:email',
    canActivate: [LoggedGuardService],
    component: ForgotPasswordComponent,
  },
  {
    path: 'dashboard',
    canActivate: [LoginGuardService],
    component: DashboardComponent,
    loadChildren: () =>
      import('./components/dashboard/routing-module/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'message/success',
    component: SuccessPageComponent,
  },
  {
    path: 'message/error',
    component: ErrorPageComponent,
  },
  {
    path: 'impressum',
    component: ImpressumComponent
  },
  {
    path: 'right-of-withdrawal',
    component: RightOfWithdrawalComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
