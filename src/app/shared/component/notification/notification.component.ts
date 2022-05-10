import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { TypeMessage } from '../../services/notification/enum/message';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [MessageService],
})
export class NotificationComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('mierda');
    this.getMessage();
  }

  getMessage(): void {
    this.subscription = this.notificationService
      .getMessage()
      .subscribe(({ typeMessage, message }) => {
        console.log('typeMessage', typeMessage);
        console.log('message', message);

        switch (typeMessage) {
          case TypeMessage.Success:
            console.log('que pedo');
            this.showSuccess(message);
            break;
          case TypeMessage.Info:
            this.showInfo(message);
            break;
          case TypeMessage.Error:
            this.showError(message);
            break;
          default:
            this.showWarn(message);
            break;
        }
      });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Ok',
      detail: message,
    });
  }

  showInfo(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  showWarn(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
