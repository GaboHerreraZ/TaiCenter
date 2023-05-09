import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { CustomTranslateModule } from 'src/app/shared/modules/translate/translate.module';

registerLocaleData(localeEs);

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CustomTranslateModule,
  ],
  exports: [CalendarComponent],
})
export class CalendarDocModule {}
