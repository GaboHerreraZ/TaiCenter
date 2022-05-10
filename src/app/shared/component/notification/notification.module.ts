import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '../../modules/prime/prime.module';
import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, PrimeModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
