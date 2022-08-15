import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { NotificationDocComponent } from './components/notification-doc/notification-doc.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';

@NgModule({
  declarations: [NotificationsComponent, NotificationDocComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    RouterModule.forChild([{ path: '', component: NotificationsComponent }]),
  ],
  providers: [DialogService],
})
export class NotificationsModule {}
