import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppHomeRoutes } from './root.routes';
import { RootComponent } from './root.component';

@NgModule({
  declarations: [RootComponent],
  imports: [CommonModule, RouterModule.forChild(AppHomeRoutes)],
  exports: [RootComponent],
})
export class RootModule {}
