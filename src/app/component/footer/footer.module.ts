import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, PrimeModule],
  exports: [FooterComponent],
})
export class FooterModule {}
