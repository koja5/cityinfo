import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public refreshGrid = new Subject<null>();
  public showConfirmDialog = new Subject<null>();
  public refreshFormDataAfterUpdate = new Subject<null>();
  public orientation = new Subject<string>();

  constructor() {}

  sendRefreshGrid() {
    this.refreshGrid.next(null);
  }

  getRefreshGrid(): Observable<any> {
    return this.refreshGrid.asObservable();
  }

  sendRefreshFormDataAfterUpdate() {
    this.refreshFormDataAfterUpdate.next(null);
  }

  getRefreshFormDataAfterUpdate(): Observable<any> {
    return this.refreshFormDataAfterUpdate.asObservable();
  }

  sendOrientation(value: string) {
    this.orientation.next(value);
  }

  getOrientation(): Observable<string> {
    return this.orientation.asObservable();
  }

  sendShowConfirmDialog() {
    this.showConfirmDialog.next(null);
  }

  getShowConfirmDialog(): Observable<any> {
    return this.showConfirmDialog.asObservable();
  }
}
