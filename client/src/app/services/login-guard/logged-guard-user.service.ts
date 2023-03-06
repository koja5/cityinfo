import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/enums/user-type';
import { HelpService } from '../help.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardUserService {

  constructor(private router: Router, public helpService: HelpService) {}

  canActivate() {
    if (this.helpService.getUserType() == UserType.user) {
      return true;
    } else {
      this.router.navigate(['/dashboard/superadmin']);
      return false;
    }
  }
}
