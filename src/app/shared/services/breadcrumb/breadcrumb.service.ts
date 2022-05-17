import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadCrumb } from '../../models/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumb = new BehaviorSubject<BreadCrumb[]>([]);

  private breadcrumb$ = this.breadcrumb.asObservable();

  constructor() {}

  setBreadCrumb(breadCrumbs: BreadCrumb[]) {
    this.breadcrumb.next(breadCrumbs);
  }

  getBreadCrumbs() {
    return this.breadcrumb$;
  }
}
