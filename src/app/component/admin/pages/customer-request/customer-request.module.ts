import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRequestComponent } from './customer-request.component';

@NgModule({
  declarations: [CustomerRequestComponent],
  imports: [CommonModule],
  exports: [CustomerRequestComponent],
})
export class CustomerRequestModule {}
