import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterRoutes } from './register.route';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RegisterRoutes)],
})
export class RegisterModule {}
