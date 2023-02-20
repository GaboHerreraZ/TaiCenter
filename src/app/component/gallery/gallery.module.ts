import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';

@NgModule({
  declarations: [GalleryComponent],
  imports: [CommonModule, PrimeModule],
  exports: [GalleryComponent],
})
export class GalleryModule {}
