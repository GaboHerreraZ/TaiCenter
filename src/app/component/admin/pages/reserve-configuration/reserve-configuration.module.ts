import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveConfigurationComponent } from './reserve-configuration.component';
import { CalendarDocModule } from 'src/app/shared/component/calendar/pages/calendar-doc/calendar.module';
import { RouterModule } from '@angular/router';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';

@NgModule({
  declarations: [ReserveConfigurationComponent],
  imports: [
    CommonModule,
    CalendarDocModule,
    CustomCommonModule,
    PrimeModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReserveConfigurationComponent,
      },
    ]),
  ],
  exports: [ReserveConfigurationComponent],
})
export class ReserveConfigurationModule {}
