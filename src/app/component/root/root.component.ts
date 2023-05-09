import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Constants } from '../login/models/constant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  title: string;
  items: MenuItem[] = [];
  itemsAdmin: MenuItem[] = [
    {
      label: this.translateService.instant('menu.users'),
      icon: 'pi pi-fw pi-user',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/usuarios']);
      },
    },
    {
      label: this.translateService.instant('core.attendance'),
      icon: 'pi pi-fw pi-check-square',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/asistencia-diaria']);
      },
    },
    {
      label: this.translateService.instant('menu.attendanceHistorical'),
      icon: 'pi pi-fw pi-folder-open',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/historico-personas-wod']);
      },
    },
    {
      label: this.translateService.instant('menu.wodConfiguration'),
      icon: 'pi pi-fw pi-cog',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/configuracion-wods']);
      },
    },
    {
      label: this.translateService.instant('menu.notifications'),
      icon: 'pi pi-fw pi-comment',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/notificaciones']);
      },
    },
    /* {
      label: 'Tarifas',
      icon: 'pi pi-fw pi-euro',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/tarifas']);
      },
    },*/
    {
      label: this.translateService.instant('core.centerRules'),
      icon: 'pi pi-fw pi-list',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/normas-del-centro']);
      },
    },
  ];

  itemsUser: MenuItem[] = [
    {
      label: this.translateService.instant('core.centerRules'),
      icon: 'pi pi-fw pi-book',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/usuario/normas-del-centro']);
      },
    },
    {
      label: this.translateService.instant('menu.userInformation'),
      icon: 'pi pi-fw pi-user',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/usuario']);
      },
    },
    {
      label: this.translateService.instant('menu.bookWod'),
      icon: 'pi pi-fw pi-check-square',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/usuario/reservar-wod']);
      },
    },
    {
      label: this.translateService.instant('menu.attendance'),
      icon: 'pi pi-fw pi-check-square',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/usuario/asistencia-diaria']);
      },
    },
  ];

  sidebar = false;
  user: User | null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private translateService: TranslateService
  ) {
    this.user = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.getMenuUser();
  }

  logOut() {
    this.loadingService.start();
    this.authService.logout();
    this.router.navigate(['inicio']);
    this.loadingService.end();
  }

  private async getMenuUser() {
    const email = this.user?.email || '';
    const isAdmin = Constants.EmailAdmin.includes(email);
    this.items = isAdmin ? this.itemsAdmin : this.itemsUser;
    this.title = isAdmin
      ? this.translateService.instant('core.adminPanel')
      : this.translateService.instant('core.userPanel');
  }
}
