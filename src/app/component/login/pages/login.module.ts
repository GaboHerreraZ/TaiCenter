import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';

const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, PrimeModule, RouterModule.forChild(LoginRoutes)],
})
export class LoginModule {}
