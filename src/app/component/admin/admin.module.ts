import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routes';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, PrimeModule, RouterModule.forChild(AdminRoutes)],
})
export class AdminModule {}
