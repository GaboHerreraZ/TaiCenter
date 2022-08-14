import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CalendarWodService } from 'src/app/shared/services/calendar-wod.service';
import { User } from '@angular/fire/auth';
import { ConfirmationService } from 'primeng/api';
import { Messages } from '../../models/messages';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { WodService } from 'src/app/shared/services/wod-service.service';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { Router } from '@angular/router';
import {
  Attend,
  WodState,
} from 'src/app/shared/component/calendar/models/constant';
import { UserService } from '../../services/user.service';
import { UserWod } from '../../models/user.model';
import { UserState } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-reserve-doc',
  templateUrl: './reserve-doc.component.html',
  styleUrls: ['./reserve-doc.component.scss'],
})
export class ReserveDocComponent implements OnInit {
  user: User | any;
  userWod: UserWod | any;

  constructor(
    private calendarWodService: CalendarWodService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private wodService: WodService,
    private loadingService: LoadingService,
    private userWodService: UserService,
    private router: Router
  ) {
    this.user = this.authService.currentUser();
  }

  ngOnInit(): void {
    console.log(11);
    this.getClassEvents();
    this.getUserData();
  }

  getClassEvents() {
    this.calendarWodService.consultaEvents.next(true);
  }

  saveClass(event: any) {
    console.log('this.userWod', this.userWod);
    if (!this.userWod) {
      this.validateUser();
      return;
    }

    if (this.userWod.state === UserState.Pendiente) {
      this.pendingUser();
      return;
    }

    const wod = event.event;
    this.confirmationService.confirm({
      key: 'reserve-id',
      message: Messages.ReserveConfirm.replace('{0}', wod.title).replace(
        '{1}',
        format(wod.start, 'dd MMMM yyyy hh:mm:00', { locale: es })
      ),
      icon: 'pi pi-info-circle',
      header: 'Confirmación',
      accept: async () => {
        this.loadingService.start();
        const existeWod = await this.wodService.getWodsByUserIdAndWodId(
          wod.id,
          this.user?.uid
        );

        if (existeWod.size > 0) {
          this.confirmationService.confirm({
            key: 'exist-id',
            message: Messages.WodReservered,
            icon: 'pi pi-info-circle',
            header: 'Wod Reservado',
          });
          this.loadingService.end();
          return;
        }

        const usersInWod = await this.wodService.getUsersInWod(wod.id);

        if (usersInWod.size === 12) {
          this.confirmationService.confirm({
            key: 'full-users-id',
            message: Messages.WodFull,
            icon: 'pi pi-info-circle',
            header: 'Wod Completo',
          });
          this.loadingService.end();
          return;
        }

        await this.wodService.addUserWod({
          userId: this.user?.uid,
          wodId: wod.id,
          state: WodState.Activa,
          attend: Attend.Pendiente,
          title: wod.title,
          start: wod.start,
          userWodId: '',
          userName: this.userWod.name,
          lastName: this.userWod.lastName,
          startDate: new Date(),
          endDate: new Date(),
        });
        this.loadingService.end();
        this.router.navigate(['panel/usuario']);
      },
    });
  }

  private async getUserData() {
    const response: any = await this.userWodService.getUserById(this.user?.uid);
    this.userWod = response.data();
  }

  private validateUser() {
    this.confirmationService.confirm({
      key: 'no-update-user-id',
      message: Messages.UpdateDataUser,
      icon: 'pi pi-info-circle',
      header: 'Actualizar datos',
    });
  }

  private pendingUser() {
    this.confirmationService.confirm({
      key: 'pending-user-id',
      message: Messages.PendingUser,
      icon: 'pi pi-info-circle',
      header: 'Usuario pendiente por activar',
    });
  }
}
