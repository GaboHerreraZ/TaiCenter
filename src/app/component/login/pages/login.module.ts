import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { RegisterDocComponent } from '../../register/pages/register-doc.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { CustomTranslateModule } from 'src/app/shared/modules/translate/translate.module';

const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterDocComponent],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild(LoginRoutes),
    CustomCommonModule,
  ],
  entryComponents: [RegisterDocComponent],
  providers: [DialogService],
})
export class LoginModule {}
