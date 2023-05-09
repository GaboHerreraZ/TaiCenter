import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFormModule } from '../../component/error-form/error-form.module';
import { CustomDatePipe } from '../../pipes/date.pipe';
import { DayPipe } from '../../pipes/day.pipe';
import { DateColorDirective } from '../../directives/date-color.directive';
import { CustomTranslateModule } from '../translate/translate.module';

@NgModule({
  declarations: [CustomDatePipe, DayPipe, DateColorDirective],
  imports: [
    CommonModule,
    CustomTranslateModule,
    ReactiveFormsModule,
    ErrorFormModule,
    FormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    ErrorFormModule,
    CustomTranslateModule,
    FormsModule,
    CustomDatePipe,
    DayPipe,
    DateColorDirective,
  ],
  providers: [],
})
export class CustomCommonModule {}
