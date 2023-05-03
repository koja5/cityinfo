import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/enums/user-type';
import { UserModel } from 'src/app/models/user-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrComponent } from '../../dynamic-component/common/toastr/toastr.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public mode = '';
  public passwordMode = 'password';
  public user = new UserModel();
  public language: any;
  public acceptTermsAndPrivacy = false;

  constructor(
    private service: CallApiService,
    private storageService: StorageService,
    private helpService: HelpService,
    private router: Router,
    private configurationService: ConfigurationService,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {
    if (this.helpService.getLanguage()) {
      this.language = this.helpService.getLanguage();
    } else {
      this.configurationService.getLanguage().subscribe((data) => {
        this.language = data;
        this.helpService.setLanguage(data);
      });
    }
  }

  switchToSignUpMode() {
    this.mode = 'sign-up-mode';
  }

  switchToForgotMode() {
    this.mode = 'forgot-mode';
  }

  switchToSignInMode() {
    this.mode = '';
  }

  changeTheme(theme: string) {
    document.getElementsByTagName('html')[0].dataset['theme'] = theme;
    localStorage.setItem('theme', theme);
  }

  showHidePassword() {
    if (this.passwordMode === 'password') {
      this.passwordMode = 'text';
    } else {
      this.passwordMode = 'password';
    }
  }

  signUp() {
    if (!this.acceptTermsAndPrivacy) {
      this.toastr.showWarningCustom(this.language.needToAcceptTermsAndPrivacy, '');
    } else {
      this.service
        .callPostMethod('/api/signUp', this.user)
        .subscribe((data) => {
          if (data) {
            this.mode = '';
            this.toastr.showSuccessCustom(
              this.language.successfulyCreatedAccount,
              ''
            );
          } else {
            this.toastr.showErrorCustom(this.language.mailExists);
          }
        });
    }
  }

  login() {
    this.service.callPostMethod('/api/login', this.user).subscribe((data) => {
      if (data) {
        this.setUserInfoAndRoute(data);
      } else {
        this.toastr.showErrorCustom(this.language.incorectMailOrPassword, '');
      }
    });
  }

  sentLinkToEmailForReset() {
    this.service
      .callPostMethod('/api/sentLinkToEmailForReset', this.user)
      .subscribe((data) => {
        if (data) {
          this.mode = '';
          this.toastr.showInfoCustom(
            this.language.sendLinkForRecoveryPasswordOnMail,
            ''
          );
        } else {
          this.toastr.showErrorCustom(this.language.incorectMailOrPassword, '');
        }
      });
  }

  setUserInfoAndRoute(data: any) {
    this.storageService.setToken(data.token);
    const token = this.helpService.getDecodeToken();
    this.helpService.setLocalStorage('logo', token.logo);
    this.setLanguageForDashboard();
    setTimeout(() => {
      if (this.helpService.getLocalStorageStringValue('previousLink')) {
        const checkSharp = this.helpService
          .getLocalStorageStringValue('previousLink')
          ?.split('#');
        this.router.navigate([
          checkSharp && checkSharp?.length > 1
            ? checkSharp[1]
            : checkSharp
            ? checkSharp[0]
            : '',
        ]);
      } else if (token.type === UserType.user) {
        this.router.navigate(['/dashboard/user']);
      } else {
        this.router.navigate(['/dashboard/superadmin']);
      }
    }, 150);
  }

  setLanguageForDashboard() {
    /*this.configurationService
      .getLanguageForDashboard('english')
      .subscribe((data) => {
        this.helpService.setLanguage(data);
      });*/
  }
}
