import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFormModule } from '../../component/error-form/error-form.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, ErrorFormModule, FormsModule],
  exports: [ReactiveFormsModule, ErrorFormModule, FormsModule],
})
export class CustomCommonModule {}
