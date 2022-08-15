import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Constants } from '../login/models/constant';

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
      label: 'Usuarios',
      icon: 'pi pi-fw pi-user',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/usuarios']);
      },
    },
    {
      label: 'Asistencia Diaria',
      icon: 'pi pi-fw pi-check-square',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/asistencia-diaria']);
      },
    },
    {
      label: 'Configurar clases',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/configuracion-wods']);
      },
    },
    {
      label: 'Notificaciones',
      icon: 'pi pi-fw pi-comment',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/administrador/notificaciones']);
      },
    },
  ];

  itemsUser: MenuItem[] = [
    {
      label: 'Normas del centro',
      icon: 'pi pi-fw pi-book',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/usuario/normas-del-centro']);
      },
    },
    {
      label: 'Mis Datos',
      icon: 'pi pi-fw pi-user',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/usuario']);
      },
    },
    {
      label: 'Reservar clases',
      icon: 'pi pi-fw pi-check-square',
      command: () => {
        this.sidebar = false;
        this.router.navigate(['panel/usuario/reservar-wod']);
      },
    },
  ];

  sidebar = false;
  user: User | null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
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
    const isAdmin = this.user?.email === Constants.EmailAdmin;
    this.items = isAdmin ? this.itemsAdmin : this.itemsUser;
    this.title = isAdmin
      ? 'Panel de configuración'
      : 'Gestiona tus clases y reservas';
  }
}
