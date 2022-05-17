import { Routes } from '@angular/router';
import { RootComponent } from './root.component';

export const AppHomeRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../login/pages/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'registro',
        loadChildren: () =>
          import('../register/pages/register-doc.module').then(
            (r) => r.RegisterDocModule
          ),
        data: {
          breadcrumb: [{ label: 'Registro', url: '#/panel/registro' }],
        },
      },
      {
        path: 'usuario', //TODO Cambiar a usuario/:id
        loadChildren: () =>
          import('../user/user.module').then((u) => u.UserModule),
        data: {
          breadcrumb: [{ label: 'Usuario', url: '#/panel/user' }],
        },
      },
      {
        path: 'administrador',
        loadChildren: () =>
          import('../admin/admin.module').then((c) => c.AdminModule),
      },
      { path: '', redirectTo: '/persona', pathMatch: 'full' },
    ],
  },
];
