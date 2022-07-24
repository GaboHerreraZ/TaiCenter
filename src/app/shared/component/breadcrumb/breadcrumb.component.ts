import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { BreadCrumb } from '../../models/breadcrumb.model';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  items$: Observable<MenuItem[]>;
  readonly home = { icon: 'pi pi-home', url: '#/panel/persona' };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadCrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.items$ = this.breadCrumbService
      .getBreadCrumbs()
      .pipe(map(this.buildMenuItem));
  }

  private buildMenuItem(breadCrumbs: BreadCrumb[]): MenuItem[] {
    return breadCrumbs.map((b) => {
      return {
        label: b.label,
        url: b.url,
      };
    });
  }
}
