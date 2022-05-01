import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDocComponent } from './person-doc.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PersonDocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PersonDocComponent,
      },
    ]),
  ],
  exports: [PersonDocComponent],
})
export class PersonDocModule {}
