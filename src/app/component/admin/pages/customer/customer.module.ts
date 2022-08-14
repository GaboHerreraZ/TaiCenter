import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { ManageCustomerComponent } from './components/manage-customer/manage-customer.component';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [CustomerComponent, ManageCustomerComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    RouterModule.forChild([{ path: '', component: CustomerComponent }]),
  ],
  providers: [DialogService],
})
export class CustomerModule {}
