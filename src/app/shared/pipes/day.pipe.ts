import { Pipe, PipeTransform } from '@angular/core';
import { WeekDay } from '../models/recurring-wod.model';

@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(value: WeekDay): string {
    switch (value.weekDay) {
      case 0:
        return 'Lunes';
      case 1:
        return 'Martes';
      case 2:
        return 'Miercoles';
      case 3:
        return 'Jueves';
      case 4:
        return 'Viernes';
      default:
        return 'Sábado';
    }
  }
}
