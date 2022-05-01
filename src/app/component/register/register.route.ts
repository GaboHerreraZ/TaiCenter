import { Routes } from '@angular/router';

export const RegisterRoutes: Routes = [
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/register-doc.module').then((m) => m.RegisterDocModule),
  },
];
