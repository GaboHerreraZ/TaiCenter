import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveDocComponent } from './reserve-doc.component';
import { RouterModule } from '@angular/router';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { CalendarDocModule } from 'src/app/shared/component/calendar/pages/calendar-doc/calendar.module';

@NgModule({
  declarations: [ReserveDocComponent],
  imports: [
    CommonModule,
    CustomCommonModule,
    CalendarDocModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReserveDocComponent,
      },
    ]),
  ],
})
export class ReserveDocModule {}
