import { Routes } from '@angular/router';

export const PersonRoutes: Routes = [
  {
    path: 'persona',
    loadChildren: () =>
      import('./pages/person-doc/person-doc.module').then(
        (m) => m.PersonDocModule
      ),
  },
];
