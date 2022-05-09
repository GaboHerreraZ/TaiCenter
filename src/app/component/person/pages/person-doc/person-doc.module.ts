import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDocComponent } from './person-doc.component';
import { RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';

@NgModule({
  declarations: [PersonDocComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PersonDocComponent,
      },
    ]),
  ],
  exports: [PersonDocComponent],
})
export class PersonDocModule {}
