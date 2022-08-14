import { Component, OnInit } from '@angular/core';
import { UserDataWod } from 'src/app/shared/models/user-data-wod.model';
import { WodService } from 'src/app/shared/services/wod-service.service';
import * as _ from 'lodash';
import { format } from 'date-fns';
import {
  Wods,
  WodState,
} from 'src/app/shared/component/calendar/models/constant';
import { ConfirmationService } from 'primeng/api';
import { Message } from '../models/message';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';

@Component({
  selector: 'app-attendance-wod',
  templateUrl: './attendance-wod.component.html',
  styleUrls: ['./attendance-wod.component.scss'],
})
export class AttendanceWodComponent implements OnInit {
  constructor(
    private wodService: WodService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) {}

  userWods: UserDataWod[] = [];
  dataGrouped: any;
  dataGroupedKeys: any[] = [];

  cols = [
    { field: 'userName', header: 'Nombre' },
    { field: 'lastName', header: 'Apellidos' },
    { field: 'attend', header: 'Asistencia' },
    { field: 'state', header: 'Estado' },
  ];

  ngOnInit(): void {
    this.getDaysWod();
  }

  getHeaderName(userDataWod: UserDataWod) {
    const date = userDataWod.start.toDate();
    return `${userDataWod.title} ${format(date, 'hh:mm:00')}`;
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
    const response = await this.wodService.getDaysWods();
    response.forEach((wods) => {
      const data: any = wods.data();
      if (data.state === WodState.Activa) {
        this.userWods.push({
          ...data,
        });
      }
    });

    this.dataGrouped = _.groupBy(this.userWods, (x: UserDataWod) => x.wodId);
    this.dataGroupedKeys = Object.keys(this.dataGrouped);
    this.loadingService.end();
    console.log('ss', this.dataGrouped);
  }

  confirmAttend(userDataWod: UserDataWod) {
    this.confirmationService.confirm({
      key: 'confirm-id',
      message: Message.confirmAttend.replace(
        '{0}',
        `${userDataWod.userName} ${userDataWod.lastName}`
      ),
      icon: 'pi pi-info-circle',
      header: 'Confirmar asistencia al wod',
      accept: async () => {
        this.loadingService.start();
        await this.saveConfirmAttend(userDataWod);
        this.getDaysWod();
        this.loadingService.end();
      },
    });
  }

  confirmNoAttend(userDataWod: UserDataWod) {
    this.confirmationService.confirm({
      key: 'confirm-no-id',
      message: Message.confirmNoAttend.replace(
        '{0}',
        `${userDataWod.userName} ${userDataWod.lastName}`
      ),
      icon: 'pi pi-info-circle',
      header: 'Confirmar inasistencia al wod',
      accept: async () => {
        this.loadingService.start();
        await this.saveNoConfirmAttend(userDataWod);
        this.getDaysWod();
        this.loadingService.end();
      },
    });
  }

  private async saveConfirmAttend(userDataWod: UserDataWod) {
    await this.wodService.confirmWod(userDataWod?.userId, userDataWod.wodId);
  }

  private async saveNoConfirmAttend(userDataWod: UserDataWod) {
    await this.wodService.confirmNoWod(userDataWod?.userId, userDataWod.wodId);
  }
}
