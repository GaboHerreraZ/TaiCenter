import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild([{ path: '', component: CustomerComponent }]),
  ],
})
export class CustomerModule {}
