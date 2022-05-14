import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { CustomDatePipe } from 'src/app/shared/pipes/date.pipe';
import { DayPipe } from 'src/app/shared/pipes/day.pipe';
import { ClassEditorComponent } from '../class-editor/class-editor.component';
import { ClassEditorModule } from '../class-editor/class-editor.module';

registerLocaleData(localeEs);

@NgModule({
  declarations: [CalendarComponent, CustomDatePipe, DayPipe],
  imports: [
    CommonModule,
    PrimeModule,
    ClassEditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarComponent,
      },
    ]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class CalendarDocModule {}
