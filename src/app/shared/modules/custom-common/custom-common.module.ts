import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFormModule } from '../../component/error-form/error-form.module';
import { CustomDatePipe } from '../../pipes/date.pipe';
import { DayPipe } from '../../pipes/day.pipe';

@NgModule({
  declarations: [CustomDatePipe, DayPipe],
  imports: [CommonModule, ReactiveFormsModule, ErrorFormModule, FormsModule],
  exports: [
    ReactiveFormsModule,
    ErrorFormModule,
    FormsModule,
    CustomDatePipe,
    DayPipe,
  ],
})
export class CustomCommonModule {}
