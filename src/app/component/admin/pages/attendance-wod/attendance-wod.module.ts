import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { RouterModule } from '@angular/router';
import { AttendanceWodComponent } from './attendance-wod.component';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [AttendanceWodComponent],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild([{ path: '', component: AttendanceWodComponent }]),
  ],
  providers: [ConfirmationService],
})
export class AttendanceWodModule {}
