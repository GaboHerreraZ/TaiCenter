import { Pipe, PipeTransform } from '@angular/core';
import RRule, { Weekday } from 'rrule';

@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(value: Weekday): string {
    switch (value) {
      case RRule.MO:
        return 'Lunes';
      case RRule.TU:
        return 'Martes';
      case RRule.WE:
        return 'Miercoles';
      case RRule.TH:
        return 'Jueves';
      case RRule.FR:
        return 'Viernes';
      default:
        return 'Sábado';
    }
  }
}
