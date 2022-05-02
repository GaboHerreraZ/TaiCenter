import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const AppHomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
      },
    ],
  },
];
