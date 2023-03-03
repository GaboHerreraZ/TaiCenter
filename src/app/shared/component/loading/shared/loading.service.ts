import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject(false);

  private countLoading: number = 0;

  loading$ = this.loading.asObservable();

  constructor() {}

  start() {
    this.countLoading++;
    this.loading.next(true);
  }

  end() {
    this.countLoading--;
    if (this.countLoading <= 0) {
      this.countLoading = 0;
      this.loading.next(false);
    }
  }
}
