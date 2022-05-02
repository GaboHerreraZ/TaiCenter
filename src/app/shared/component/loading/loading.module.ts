import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { PrimeModule } from '../../modules/prime/prime.module';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, PrimeModule],
  exports: [LoadingComponent],
})
export class LoadingModule {}
