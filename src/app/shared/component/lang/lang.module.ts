import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangComponent } from './lang.component';
import { PrimeModule } from '../../modules/prime/prime.module';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LangComponent],
  imports: [CommonModule, PrimeModule, FormsModule, ReactiveFormsModule],
  exports: [LangComponent],
  providers: [TranslateService],
})
export class LangModule {}
