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
      },
      {
        path: 'persona',
        loadChildren: () =>
          import('../person/pages/person-doc/person-doc.module').then(
            (p) => p.PersonDocModule
          ),
      },
      {
        path: 'calendario',
        loadChildren: () =>
          import('../calendar/pages/calendar-doc/calendar.module').then(
            (c) => c.CalendarDocModule
          ),
      },
    ],
  },
];
