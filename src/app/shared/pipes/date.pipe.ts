import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'CustomDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any): string {
    const newDate = !value['seconds'] ? new Date(value) : value.toDate();
    //return format(newDate, 'dd/MM/yyyy H:mm:00');
    return format(newDate, 'dd MMMM yyyy H:mm:00', { locale: es });
  }
}
