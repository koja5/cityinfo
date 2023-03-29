import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';
import { ToastrComponent } from '../../dynamic-component/common/toastr/toastr.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public data = {
    password: '',
    repetPassword: '',
    email: '',
  };
  public language: any;

  constructor(
    private service: CallApiService,
    private router: ActivatedRoute,
    private toastr: ToastrComponent,
    private helpService: HelpService,
    private redirect: Router
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

  recoveryPassword() {
    if (this.data.password != this.data.repetPassword) {
      this.toastr.showErrorCustom(this.language.passwordIsNotSame, '');
    } else {
      this.data.email = this.router.snapshot.params['email'];
      this.service
        .callPostMethod('api/recoveryPassword', this.data)
        .subscribe((data) => {
          if (data) {
            this.toastr.showSuccessCustom(this.language.passwordIsChanged, '');
            this.redirect.navigate(['/login']);
          }
        });
    }
  }
}
