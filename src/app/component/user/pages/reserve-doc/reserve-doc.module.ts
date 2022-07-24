import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveDocComponent } from './reserve-doc.component';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { CalendarDocModule } from 'src/app/shared/component/calendar/pages/calendar-doc/calendar.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { ConfirmationService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReserveDocComponent],
  imports: [
    CommonModule,
    CustomCommonModule,
    CalendarDocModule,
    PrimeModule,
    RouterModule.forChild([{ path: '', component: ReserveDocComponent }]),
  ],
  providers: [ConfirmationService],
})
export class ReserveDocModule {}
