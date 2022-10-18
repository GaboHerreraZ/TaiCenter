import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateComponent } from './rate.component';
import { RateDocComponent } from './component/rate-doc/rate-doc.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RateComponent, RateDocComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    RouterModule.forChild([{ path: '', component: RateComponent }]),
  ],
  providers: [DialogService],
})
export class RateModule {}
