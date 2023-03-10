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

  constructor(
    private service: CallApiService,
    private storageService: StorageService,
    private helpService: HelpService,
    private router: Router,
    private configurationService: ConfigurationService,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {}

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
    this.service.callPostMethod('/api/signUp', this.user).subscribe((data) => {
      if (data) {
        this.mode = '';
        this.toastr.showSuccessCustom(
          'You successfuly create account. Please verified your mail address!',
          ''
        );
      } else {
        this.toastr.showErrorCustom('Mail address exists! Try another email!');
      }
    });
  }

  login() {
    this.service.callPostMethod('/api/login', this.user).subscribe((data) => {
      if (data) {
        this.setUserInfoAndRoute(data);
      } else {
        this.toastr.showErrorCustom(
          'Your email or password is incorrect or you have not verified your email address!',
          ''
        );
      }
    });
  }

  sentLinkToEmailForReset() {
    this.service
      .callPostMethod('/api/sentLinkToEmailForReset', this.user)
      .subscribe((data) => {
        if (data) {
          this.mode = '';
        } else {
          this.toastr.showErrorCustom(
            'Your email or password is incorrect or you have not verified your email address!',
            ''
          );
        }
      });
  }

  setUserInfoAndRoute(data: any) {
    this.storageService.setToken(data.token);
    const token = this.helpService.getDecodeToken();
    this.helpService.setLocalStorage('logo', token.logo);
    this.setLanguageForDashboard();
    setTimeout(() => {
      if (token.type === UserType.user) {
        this.router.navigate(['/dashboard/user']);
      } else {
        this.router.navigate(['/dashboard/superadmin']);
      }
    }, 20);
  }

  setLanguageForDashboard() {
    /*this.configurationService
      .getLanguageForDashboard('english')
      .subscribe((data) => {
        this.helpService.setLanguage(data);
      });*/
    this.helpService.setLanguage({
      gridPopupAddTitle: 'Add new record',
      gridPopupEditTitle: 'Edit record',
    });
  }
}
