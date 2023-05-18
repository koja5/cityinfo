import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { UserType } from '../enums/user-type';
import { FileType } from '../enums/file-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdsModel } from '../models/ads-model';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  helper = new JwtHelperService();

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  postRequestDataParameters(body: any, data: any, parameters: string[]) {
    for (let i = 0; i < parameters.length; i++) {
      body[parameters[i]] = data[parameters[i]];
    }
    return body;
  }

  getRequestDataParameters(data: any, parameters: string[]) {
    let value = '';
    if (parameters) {
      for (let i = 0; i < parameters.length; i++) {
        value += data[parameters[i]] + '/';
      }
    }
    return value;
  }

  getDecodeToken() {
    if (!this.storageService.getToken()) {
      this.router.navigate(['/login']);
    } else {
      return this.helper.decodeToken(this.storageService.getToken()).user;
    }
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? '{}');
  }

  getLocalStorageStringValue(key: string) {
    return localStorage.getItem(key);
  }

  removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  getHeightForGridWithoutPx(partOfTab?: boolean) {
    let innerHeight = window.innerHeight;
    if (partOfTab) {
      innerHeight = Number(innerHeight - 303);
    } else {
      innerHeight = Number(innerHeight - 267);
    }

    if (this.getLocalStorageStringValue('orientation') === 'horizontal') {
      if (window.innerWidth > 992) {
        innerHeight = innerHeight - 60;
      } else {
        innerHeight = innerHeight - 20;
      }
    }
    return innerHeight;
  }

  setLanguage(value: any) {
    localStorage.setItem(
      'language',
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  getLanguage() {
    if (localStorage.getItem('language')) {
      return JSON.parse(localStorage.getItem('language') ?? '{}');
    } else {
      return null;
    }
  }

  concatenatePageLink(link: string, parameters: string[], data: any) {
    let parametersValue = '';
    for (let i = 0; i < parameters.length; i++) {
      parametersValue += data[parameters[i]] + '/';
    }
    if (link.endsWith('/')) {
      return link + parametersValue;
    } else {
      return link + '/' + parametersValue;
    }
  }

  getFileTypeIcon(type: string) {
    switch (type) {
      case FileType.pdf:
        return 'picture_as_pdf';
      default:
        return 'description';
    }
  }

  getTypeOfName(type: any) {
    for (var item in UserType) {
      if (Number(item) === type) {
        return UserType[item];
      }
    }
    return UserType[UserType.user];
  }

  getUserType() {
    const token = this.getDecodeToken();
    return token.type;
  }

  checkRights(rights: any) {
    const type = this.getTypeOfName(this.getDecodeToken().type);
    const isClub = this.getDecodeToken().isClub;
    if (rights) {
      for (let i = 0; i < rights.length; i++) {
        if (rights[i] === type || (rights[i] == 'isClub' && isClub)) {
          return true;
        }
      }
      return false;
    } else return true;
  }

  getUserNameFromToken() {
    const token = this.getDecodeToken();
    return token.firstname ? token.firstname : token.lastname;
  }

  getUserId() {
    const token = this.getDecodeToken();
    return token.id;
  }

  checkAccountIsClub() {
    const token = this.getDecodeToken();
    return token.isClub;
  }

  getLanguageFromFolder(language: string, file: string) {
    return this.http.get(
      '../assets/configurations/languages/pages/' +
        language +
        '/' +
        file +
        '.json'
    );
  }

  getPaymentDescription(typeOfAd: string, data: AdsModel, user: any) {
    const language = this.getLanguage();
    return (
      language.stripePaymentReceiveType +
      typeOfAd +
      ', ' +
      language.id +
      ':' +
      data.id +
      ', ' +
      language.name +
      ':' +
      data.name +
      ', ' +
      language.customerName +
      ':' +
      user.firstname +
      ', ' +
      language.email +
      ':' +
      user.email +
      ', ' +
      language.phone +
      ':' +
      user.phone
    );
  }

  addWeeks(date: Date, weeks: number) {
    const newDate = new Date(JSON.parse(JSON.stringify(date)));
    if (date instanceof Date === false) {
      date = new Date(date);
    }
    newDate.setDate(date.getDate() + 7 * weeks);
    return newDate;
  }
}
