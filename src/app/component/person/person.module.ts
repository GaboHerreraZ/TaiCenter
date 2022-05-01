import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonRoutes } from './person.route';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PersonRoutes)],
})
export class PersonModule {}
