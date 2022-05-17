import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () =>
          import('./pages/customer/customer.module').then(
            (u) => u.CustomerModule
          ),
      },
      {
        path: 'configurar-clases',
        loadChildren: () =>
          import(
            './pages/reserve-configuration/reserve-configuration.module'
          ).then((m) => m.ReserveConfigurationModule),
      },
    ],
  },
];
