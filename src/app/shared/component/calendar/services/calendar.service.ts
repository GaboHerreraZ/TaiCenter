import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private displayDialogClass = new BehaviorSubject(false);
  public displayDialogClass$ = this.displayDialogClass.asObservable();

  constructor() {}

  enableDialogClass(show: boolean) {
    this.displayDialogClass.next(show);
  }
}
