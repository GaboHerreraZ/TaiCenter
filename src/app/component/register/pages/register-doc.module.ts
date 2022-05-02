import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDocComponent } from './register-doc.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
const registerRoutes: Routes = [
  {
    path: '',
    component: RegisterDocComponent,
  },
];

@NgModule({
  declarations: [RegisterDocComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    RouterModule.forChild(registerRoutes),
  ],
  exports: [RegisterDocComponent],
})
export class RegisterDocModule {}
