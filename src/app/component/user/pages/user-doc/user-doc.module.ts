import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDocComponent } from './user-doc.component';
import { RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { ConfirmationService } from 'primeng/api';
import { SuggestionComponent } from './component/suggestion/suggestion.component';

@NgModule({
  declarations: [UserDocComponent, SuggestionComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    RouterModule.forChild([{ path: '', component: UserDocComponent }]),
  ],
  providers: [ConfirmationService],
})
export class UserDocModule {}
