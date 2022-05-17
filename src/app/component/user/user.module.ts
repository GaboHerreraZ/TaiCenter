import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user.routes';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { ReserveDocComponent } from './pages/reserve-doc/reserve-doc.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, PrimeModule, RouterModule.forChild(UserRoutes)],
})
export class UserModule {}
