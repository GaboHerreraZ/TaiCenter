import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFormModule } from '../../component/error-form/error-form.module';
import { CustomDatePipe } from '../../pipes/date.pipe';
import { DayPipe } from '../../pipes/day.pipe';
import { DateColorDirective } from '../../directives/date-color.directive';

@NgModule({
  declarations: [CustomDatePipe, DayPipe, DateColorDirective],
  imports: [CommonModule, ReactiveFormsModule, ErrorFormModule, FormsModule],
  exports: [
    ReactiveFormsModule,
    ErrorFormModule,
    FormsModule,
    CustomDatePipe,
    DayPipe,
    DateColorDirective,
  ],
  providers: [],
})
export class CustomCommonModule {}
