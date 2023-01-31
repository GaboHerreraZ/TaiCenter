import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalWodComponent } from './historical-wod.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [HistoricalWodComponent],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild([{ path: '', component: HistoricalWodComponent }]),
  ],
  providers: [ConfirmationService],
})
export class HistoricalWodModule {}
