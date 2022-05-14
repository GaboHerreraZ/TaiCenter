import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'CustomDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date): string {
    return format(value, 'dd/MM/yyyy hh:mm:00');
  }
}
