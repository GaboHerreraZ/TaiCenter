import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { PrimeModule } from '../../shared/modules/prime/prime.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, PrimeModule, RouterModule.forChild(routes)],
  exports: [HeaderComponent],
})
export class HeaderModule {}
