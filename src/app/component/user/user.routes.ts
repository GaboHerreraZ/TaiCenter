import { Routes } from '@angular/router';
import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'id',
        loadChildren: () =>
          import('./pages/user-doc/user-doc.module').then(
            (u) => u.UserDocModule
          ),
      },
      {
        path: 'reservar',
        loadChildren: () =>
          import('./pages/reserve-doc/reserve-doc.module').then(
            (m) => m.ReserveDocModule
          ),
      },
    ],
  },
];
