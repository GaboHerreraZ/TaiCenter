import {
  AuthGuard,
  customClaims,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { map, pipe } from 'rxjs';
import { Constants } from '../login/models/constant';
import { UserService } from '../user/services/user.service';
import { RootComponent } from './root.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const accountAdmin = (next: any) =>
  pipe(
    customClaims,
    map((claims) => {
      if (!Constants.EmailAdmin.includes(claims.email)) {
        redirectUnauthorizedTo(['login']);
        return;
      }
      return true;
    })
  );
/*const accountAdmin = (next:) =>
  pipe(
    customClaims,
    map((claims) => claims[`account-${next.params.accountId}-role`] === 'admin')
  );*/

export const AppHomeRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'usuario',
        loadChildren: () =>
          import(
            '../../../app/component/user/pages/user-doc/user-doc.module'
          ).then((u) => u.UserDocModule),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
        },
        resolve: { datoUsuario: UserService },
      },
      {
        path: 'usuario/reservar-wod',
        loadChildren: () =>
          import(
            '../../../app/component/user/pages/reserve-doc/reserve-doc.module'
          ).then((u) => u.ReserveDocModule),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
        },
      },
      {
        path: 'usuario/normas-del-centro',
        loadChildren: () =>
          import(
            '../../../app/component/user/pages/center-rule/center-rule.module'
          ).then((u) => u.CenterRuleModule),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
        },
      },
      {
        path: 'usuario/asistencia-diaria',
        loadChildren: () =>
          import('../admin/pages/attendance-wod/attendance-wod.module').then(
            (c) => c.AttendanceWodModule
          ),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
        },
      },
      {
        path: 'administrador/configuracion-wods',
        loadChildren: () =>
          import(
            '../admin/pages/reserve-configuration/reserve-configuration.module'
          ).then((c) => c.ReserveConfigurationModule),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: accountAdmin,
        },
      },
      {
        path: 'administrador/asistencia-diaria',
        loadChildren: () =>
          import('../admin/pages/attendance-wod/attendance-wod.module').then(
            (c) => c.AttendanceWodModule
          ),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: accountAdmin,
        },
      },
      {
        path: 'administrador/historico-personas-wod',
        loadChildren: () =>
          import('../admin/pages/historical-wod/historical-wod.module').then(
            (c) => c.HistoricalWodModule
          ),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: accountAdmin,
        },
      },
      {
        path: 'administrador/usuarios',
        loadChildren: () =>
          import('../admin/pages/customer/customer.module').then(
            (c) => c.CustomerModule
          ),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: accountAdmin,
        },
      },
      {
        path: 'administrador/notificaciones',
        loadChildren: () =>
          import('../admin/pages/notifications/notifications.module').then(
            (c) => c.NotificationsModule
          ),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: accountAdmin,
        },
      },
      {
        path: 'administrador/tarifas',
        loadChildren: () =>
          import('../admin/pages/rate/rate.module').then((c) => c.RateModule),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: accountAdmin,
        },
      },
      {
        path: 'administrador/normas-del-centro',
        loadChildren: () =>
          import('../admin/pages/rules/rules.module').then(
            (c) => c.RulesModule
          ),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: accountAdmin,
        },
      },
    ],
  },
  {
    path: '',
    redirectTo: '/panel/usuario/reservar-wod',
    pathMatch: 'full',
  },
];
