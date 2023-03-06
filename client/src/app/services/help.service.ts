import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { UserType } from '../enums/user-type';
import { FileType } from '../enums/file-type';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  helper = new JwtHelperService();

  constructor(private storageService: StorageService) {}

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
    return this.helper.decodeToken(this.storageService.getToken()).user;
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  getLocalStorageStringValue(key: string) {
    return localStorage.getItem(key);
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
    if (rights) {
      for (let i = 0; i < rights.length; i++) {
        if (rights[i] === type) {
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
}
