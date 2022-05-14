import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassEditorComponent } from './class-editor.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { CustomCommonModule } from 'src/app/shared/modules/custom-common/custom-common.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ControlErrorDirective } from 'src/app/shared/directives/control-error.directive';
@NgModule({
  declarations: [ClassEditorComponent, ControlErrorDirective],
  imports: [
    CommonModule,
    PrimeModule,
    CustomCommonModule,
    FlatpickrModule.forRoot({ locale: 'es' }),
  ],
  exports: [ClassEditorComponent],
})
export class ClassEditorModule {}
