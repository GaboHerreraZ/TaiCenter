import { Component, OnInit, ViewChild } from '@angular/core';
import { addDays, format } from 'date-fns';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { mergeMap, of } from 'rxjs';
import { UserWod } from 'src/app/component/user/models/user.model';
import { UserService } from 'src/app/component/user/services/user.service';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { CenterWodsByPlan, TypeMessage } from 'src/app/shared/models/constants';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WodService } from 'src/app/shared/services/wod-service.service';
import { Message } from '../models/message';
import { ManageCustomerComponent } from './components/manage-customer/manage-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  @ViewChild('dt') dt: Table;

  cols = [
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellidos' },
    { field: 'phoneNumber', header: 'Movil' },
    { field: 'plan', header: 'Plan' },
    { field: 'state', header: 'Estado' },
    { field: 'startDate', header: 'Fecha Inscripción' },
    { field: 'endDate', header: 'Fecha Vigencia' },
    { field: 'terms', header: 'Autoriza' },
  ];

  users: UserWod[] = [];

  colorPending: string = '#ffd8b2';
  colorEnd: string = '#ff0000';

  centerPlan = CenterWodsByPlan;

  checktDate = addDays(new Date(), -7);

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private wodService: WodService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private async getUsers() {
    this.loadingService.start();
    const users = await this.userService.getUsers();
    users.forEach((user) => {
      const data: any = user.data();
      const newDate: Date = data.endDate.toDate();
      this.users.push({
        userId: user.id,
        ...data,
        endDate: newDate,
      });
    });
    this.loadingService.end();
  }

  applyFilterGlobal(event: any, stringVal: string) {
    this.dt.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }

  deleteUser(user: UserWod) {
    this.confirmationService.confirm({
      key: 'confirm-id',
      message: Message.confirmDeletedUser.replace(
        '{0}',
        `${user.name} ${user.lastName}`
      ),
      icon: 'pi pi-info-circle',
      header: 'Confirmar Eliminación de Usuario de la Aplicación',
      accept: async () => {
        this.loadingService.start();
        await this.wodService.deleteWodsUser(user.userId);
        await this.userService.deleteUserById(user.userId);
        this.loadingService.end();
        this.notificationService.createMessage(TypeMessage.Success, [
          Message.UserDeletedOk,
        ]);
        this.getUsers();
      },
    });
  }

  enableUser(user: UserWod) {
    const ref = this.dialogService.open(ManageCustomerComponent, {
      header: 'Gestionar Usuario',
      width: '80%',
      autoZIndex: true,
      data: {
        title: Message.activateUser,
        activateUser: true,
        user: user,
      },
    });

    ref.onClose
      .pipe(
        mergeMap((data) => {
          if (data) {
            return this.activateUser(user, data);
          }
          return of();
        })
      )
      .subscribe(() => {
        this.getUsers();
      });
  }

  private async activateUser(user: UserWod, data: any) {
    this.loadingService.start();
    user.state = data.state;
    user.endDate = data.endDate;
    user.plan = data.plan;
    user.remainingWods = this.centerPlan.find(
      (p) => p.plan === data.plan
    )?.wods;
    await this.userService.updateUser(user, user.userId);
    this.notificationService.createMessage(TypeMessage.Success, [
      Message.ActivateOk,
    ]);
    this.users = [];
    this.loadingService.end();
  }
}
