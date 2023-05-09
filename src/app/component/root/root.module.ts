import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppHomeRoutes } from './root.routes';
import { RootComponent } from './root.component';
import { AuthGuardModule } from '@angular/fire/auth-guard';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomTranslateModule } from 'src/app/shared/modules/translate/translate.module';

@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    AuthGuardModule,
    PrimeModule,
    CustomTranslateModule,
    RouterModule.forChild(AppHomeRoutes),
  ],
  exports: [RootComponent],
})
export class RootModule {}
