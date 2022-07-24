import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TypeMessage } from '../../enum/message';
import { NotificationService } from '../../services/notification.service';

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
    this.getMessage();
  }

  getMessage(): void {
    this.subscription = this.notificationService
      .getMessage()
      .subscribe(({ typeMessage, messages }) => {
        switch (typeMessage) {
          case TypeMessage.Success:
            this.showSuccess(messages);
            break;
          case TypeMessage.Info:
            this.showInfo(messages);
            break;
          case TypeMessage.Error:
            this.showError(messages);
            break;
          default:
            this.showWarn(messages);
            break;
        }
      });
  }

  showSuccess(message: string[]) {
    this.messageService.add({
      key: 'single',
      severity: 'success',
      summary: 'Ok',
      data: message,
    });
  }

  showInfo(message: string[]) {
    this.messageService.add({
      key: 'single',
      severity: 'info',
      summary: 'Info',
      data: message,
    });
  }

  showWarn(message: string[]) {
    this.messageService.add({
      key: 'single',
      severity: 'warn',
      summary: 'Warn',
      data: message,
    });
  }

  showError(message: string[]) {
    this.messageService.add({
      key: 'single',
      severity: 'error',
      summary: 'Error',
      data: message,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
