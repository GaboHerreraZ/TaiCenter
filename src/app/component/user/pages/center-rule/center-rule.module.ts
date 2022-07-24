import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterRuleComponent } from './center-rule.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CenterRuleComponent],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild([{ path: '', component: CenterRuleComponent }]),
  ],
})
export class CenterRuleModule {}
