import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'panel',
    loadChildren: () =>
      import('./component/root/root.module').then((m) => m.RootModule),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./component/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/component/login/pages/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
];
