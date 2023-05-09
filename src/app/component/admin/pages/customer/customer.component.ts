import { Component, OnInit, ViewChild } from '@angular/core';
import { addDays } from 'date-fns';
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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  @ViewChild('dt') dt: Table;

  cols = [
    { field: 'name', header: this.translateService.instant('user.name') },
    {
      field: 'lastName',
      header: this.translateService.instant('user.lastName'),
    },
    {
      field: 'phoneNumber',
      header: this.translateService.instant('user.movil'),
    },
    { field: 'plan', header: this.translateService.instant('user.plan') },
    { field: 'state', header: this.translateService.instant('user.state') },
    {
      field: 'startDate',
      header: this.translateService.instant('core.suscriptionDate'),
    },
    {
      field: 'endDate',
      header: this.translateService.instant('core.suscriptionExpiration'),
    },
    { field: 'terms', header: this.translateService.instant('core.terms') },
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
    private wodService: WodService,
    private translateService: TranslateService
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
      message: this.translateService
        .instant(`message.${Message.confirmDeletedUser}`)
        .replace('{0}', `${user.name} ${user.lastName}`),
      icon: 'pi pi-info-circle',
      header: this.translateService.instant('message.confirmUserDelete'),
      accept: async () => {
        this.loadingService.start();
        await this.wodService.deleteWodsUser(user.userId);
        await this.userService.deleteUserById(user.userId);
        this.loadingService.end();
        this.notificationService.createMessage(TypeMessage.Success, [
          this.translateService.instant(`message.${Message.UserDeletedOk}`),
        ]);
        this.getUsers();
      },
    });
  }

  enableUser(user: UserWod) {
    const ref = this.dialogService.open(ManageCustomerComponent, {
      header: this.translateService.instant('core.handleUser'),
      width: '80%',
      autoZIndex: true,
      data: {
        title: this.translateService.instant(`message.${Message.activateUser}`),
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
      this.translateService.instant(`message.${Message.ActivateOk}`),
    ]);
    this.users = [];
    this.loadingService.end();
  }
}
