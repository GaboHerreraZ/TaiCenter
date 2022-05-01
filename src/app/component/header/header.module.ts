import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { PrimeModule } from '../../shared/modules/prime/prime.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, PrimeModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
