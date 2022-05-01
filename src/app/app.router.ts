import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./component/login/pages/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
