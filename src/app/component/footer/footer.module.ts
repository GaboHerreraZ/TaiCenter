import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomTranslateModule } from 'src/app/shared/modules/translate/translate.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, PrimeModule, CustomTranslateModule],
  exports: [FooterComponent],
})
export class FooterModule {}
