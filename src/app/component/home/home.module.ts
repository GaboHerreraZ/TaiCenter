import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PrimeModule } from '../../shared/modules/prime/prime.module';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '../footer/footer.module';
import { CalendarDocModule } from 'src/app/shared/component/calendar/pages/calendar-doc/calendar.module';
import { GalleryModule } from '../gallery/gallery.module';
import { LangModule } from 'src/app/shared/component/lang/lang.module';
import { CustomTranslateModule } from 'src/app/shared/modules/translate/translate.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CustomTranslateModule,
    PrimeModule,
    LangModule,
    FooterModule,
    CalendarDocModule,
    GalleryModule,
    RouterModule.forChild(routes),
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
