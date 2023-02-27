import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ConfirmationService } from 'primeng/api';
import { Constants } from 'src/app/component/login/models/constant';
import { UserService } from 'src/app/component/user/services/user.service';
import { Wods } from 'src/app/shared/component/calendar/models/constant';
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
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private userService: UserService
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
      case Wods.Halterofilia:
        className = 'halterofilia';
        break;
      case Wods.Gymnastic:
        className = 'gymnastic';
        break;
      default:
        className = 'open-center';
        break;
    }
    return className;
  }

  async confirmAttend(userDataWod: UserDataWod) {
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
        await this.restWodUser(userDataWod.userId);
        this.getDaysWod();
        this.loadingService.end();
      },
    });
  }

  private async saveConfirmAttend(userDataWod: UserDataWod) {
    await this.wodService.confirmWod(userDataWod?.userId, userDataWod.wodId);
  }

  private async restWodUser(userId?: string) {
    const user = await this.userService.getUserById(`${userId}`);
    const dataUser: any = user.data();
    const newUser = {
      ...dataUser,
      remainingWods: dataUser.remainingWods - 1,
    };

    await this.userService.updateUser(newUser, `${userId}`);
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
