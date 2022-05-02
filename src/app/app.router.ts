import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'tc',
    loadChildren: () =>
      import('../app/component/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./component/header/header.module').then((m) => m.HeaderModule),
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
