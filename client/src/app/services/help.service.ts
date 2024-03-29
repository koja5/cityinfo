import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { UserType } from '../enums/user-type';
import { FileType } from '../enums/file-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdsModel } from '../models/ads-model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  helper = new JwtHelperService();
  public galleryPath = './assets/file_upload/gallery/';

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

  convertStringToIntegerArray(data: any) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category) {
        data[i].category = data[i].category.split(',');
        for (let j = 0; j < data[i].category.length; j++) {
          data[i].category[j] = Number(data[i].category[j]);
        }
      }
    }
    return data;
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/webp' });
    return blob;
  }

  generateGalleryPath(gallery: any) {
    let path = '';
    for (let i = 0; i < gallery.length; i++) {
      path += this.galleryPath + UUID.UUID() + '.webp';
      path += ';';
    }
    return path;
  }

  compareOldAndNewGalleryPath(oldGalleryPath: any, newGalleryPath: any) {
    const oldGallery = this.getImagesForGallery(oldGalleryPath);
    const newGallery = this.getImagesForGallery(newGalleryPath);
    let diffPaths = [];

    if (newGallery.length == 1) {
      diffPaths.push(newGallery);
    } else {
      for (let i = 0; i < newGallery.length; i++) {
        let ind = 0;
        for (let j = 0; j < oldGallery.length; j++) {
          if (newGallery[i] === oldGallery[j]) {
            oldGallery.split(j, 1);
            ind = 1;
            break;
          }
          if (ind) {
            break;
          }
          diffPaths.push(newGallery[i]);
        }
      }
    }
    return diffPaths;
  }

  getImagesForGallery(gallery: any) {
    if (gallery) {
      let elements = gallery.split(';');
      elements.pop();
      return elements;
    } else return [];
  }

  convertCoverPath(cover: string) {
    if (!cover) {
      return '../../../../assets/images/no-photo-available.png';
    } else {
      let data = cover.split('/assets');
      if (data.length == 1) {
        data = cover.split('\\assets');
      }
      return '/assets' + data[1];
    }
  }
}
