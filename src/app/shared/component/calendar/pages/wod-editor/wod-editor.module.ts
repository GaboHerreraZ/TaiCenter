import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WodEditorComponent } from './wod-editor.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { FlatpickrModule } from 'angularx-flatpickr';
@NgModule({
  declarations: [WodEditorComponent],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    FlatpickrModule.forRoot({ locale: 'es' }),
  ],
  exports: [WodEditorComponent],
})
export class WodEditorModule {}
