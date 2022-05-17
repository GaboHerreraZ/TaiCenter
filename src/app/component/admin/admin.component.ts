import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  sidebar = false;

  items: MenuItem[];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Mis Datos',
        icon: 'pi pi-fw pi-user',
        routerLink: '/panel/usuario/id',
      },
      {
        label: 'Reservar clases',
        icon: 'pi pi-fw pi-check-square',
        routerLink: '/panel/usuario/reservar',
      },
    ];
  }
}
