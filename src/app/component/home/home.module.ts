import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppHomeRoutes } from './home.routes';
import { FooterModule } from '../footer/footer.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FooterModule, RouterModule.forChild(AppHomeRoutes)],
  exports: [HomeComponent],
})
export class HomeModule {}
