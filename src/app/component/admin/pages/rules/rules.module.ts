import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules.component';
import { RulesDocComponent } from './components/rules-doc/rules-doc.component';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';

@NgModule({
  declarations: [RulesComponent, RulesDocComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    RouterModule.forChild([{ path: '', component: RulesComponent }]),
  ],
  providers: [DialogService],
})
export class RulesModule {}
