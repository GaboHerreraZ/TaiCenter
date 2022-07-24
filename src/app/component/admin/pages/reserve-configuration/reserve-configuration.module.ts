import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveConfigurationComponent } from './reserve-configuration.component';
import { CalendarDocModule } from 'src/app/shared/component/calendar/pages/calendar-doc/calendar.module';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { WodEditorModule } from 'src/app/shared/component/calendar/pages/wod-editor/wod-editor.module';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReserveConfigurationComponent],
  imports: [
    CommonModule,
    CalendarDocModule,
    WodEditorModule,
    CustomCommonModule,
    PrimeModule,
    RouterModule.forChild([
      { path: '', component: ReserveConfigurationComponent },
    ]),
  ],
  providers: [DialogService],
})
export class ReserveConfigurationModule {}
