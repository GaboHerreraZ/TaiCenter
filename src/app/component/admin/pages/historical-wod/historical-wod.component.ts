import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ConfirmationService } from 'primeng/api';
import { Constants } from 'src/app/component/login/models/constant';
import { UserService } from 'src/app/component/user/services/user.service';
import {
  Wods,
  WodState,
} from 'src/app/shared/component/calendar/models/constant';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { UserDataWod } from 'src/app/shared/models/user-data-wod.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WodService } from 'src/app/shared/services/wod-service.service';
import { Message } from '../models/message';
import * as _ from 'lodash';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-historical-wod',
  templateUrl: './historical-wod.component.html',
  styleUrls: ['./historical-wod.component.scss'],
})
export class HistoricalWodComponent implements OnInit {
  userWods: UserDataWod[] = [];
  dataGrouped: any;
  dataGroupedKeys: any[] = [];
  isAdmin: boolean = false;
  user: User | null;

  cols = [
    { field: 'userName', header: 'Nombre' },
    { field: 'lastName', header: 'Apellidos' },
    { field: 'attend', header: 'Asistencia' },
    { field: 'state', header: 'Estado' },
  ];

  constructor(
    private wodService: WodService,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUser();
    this.isAdmin = this.getIsAdmin();
  }

  ngOnInit(): void {
    this.getDaysWod();
  }

  getHeaderName(userDataWod: UserDataWod) {
    const date = userDataWod.start.toDate();
    return `${userDataWod.title} ${format(date, 'dd MMMM yyyy H:mm:00', {
      locale: es,
    })}`;
  }

  getClassHeader(userDataWod: UserDataWod) {
    let className = '';
    switch (userDataWod.title) {
      case Wods.Cross:
        className = 'cross';
        break;
      case Wods.Hiit:
        className = 'hiit';
        break;
      case Wods.Gap:
        className = 'gap';
        break;
      case Wods.Tabata:
        className = 'tabata';
        break;
      default:
        className = 'open-center';
        break;
    }
    return className;
  }

  private async getDaysWod() {
    this.dataGrouped = [];
    this.dataGroupedKeys = [];
    this.userWods = [];
    this.loadingService.start();
    const response = await this.wodService.getHistoricalDaysWods();
    response.forEach((wods) => {
      const data: any = wods.data();
      this.userWods.push({
        ...data,
      });
    });

    this.dataGrouped = _.groupBy(this.userWods, (x: UserDataWod) => x.wodId);
    this.dataGroupedKeys = Object.keys(this.dataGrouped);
    this.loadingService.end();
  }

  private getIsAdmin() {
    const email = this.user?.email || '';
    return Constants.EmailAdmin.includes(email);
  }
}
