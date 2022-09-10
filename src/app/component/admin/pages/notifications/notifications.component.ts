import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { from, map, Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { TypeMessage } from 'src/app/shared/models/constants';
import { NotificationWod } from 'src/app/shared/models/notification-wod.model';
import { NotificationWodService } from 'src/app/shared/services/notification-wod.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Message } from '../models/message';
import { NotificationDocComponent } from './components/notification-doc/notification-doc.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  cols: any[];
  notifications: NotificationWod[] = [];

  unsubscribe = new Subject();

  constructor(
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private notificationWodService: NotificationWodService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'summary', header: 'Tipo' },
      { field: 'detail', header: 'Notificación' },
    ];

    this.getNotifications();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
  }

  addNewNotificacion() {
    const ref = this.dialogService.open(NotificationDocComponent, {
      width: '80%',
      header: 'Crear Notificación',
    });
    ref.onClose.subscribe((result) => {
      if (result) {
        this.saveNotification(result);
      }
    });
  }

  async delete(notification: NotificationWod) {
    this.loadingService.start();
    await this.notificationWodService.deletNotificationById(notification.id);
    this.loadingService.end();
    this.notificationService.createMessage(TypeMessage.Success, [
      Message.NotificationDeleteOk,
    ]);

    this.getNotifications();
  }

  private async saveNotification(notification: NotificationWod) {
    this.loadingService.start();
    await this.notificationWodService.addNewNotification(notification);
    this.loadingService.end();
    this.notificationService.createMessage(TypeMessage.Success, [
      Message.NotificationOk,
    ]);
    this.getNotifications();
  }

  private getNotifications() {
    this.loadingService.start();
    from(this.notificationWodService.getNotifications())
      .pipe(
        takeUntil(this.unsubscribe),
        map((notifications: any) => {
          const notificationsData: NotificationWod[] = [];
          notifications.forEach((n: any) => {
            notificationsData.push({ id: n.id, ...n.data() });
          });
          return notificationsData;
        })
      )
      .subscribe((result) => {
        this.notifications = result;
        this.loadingService.end();
      });
  }
}
