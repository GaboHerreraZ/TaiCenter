import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import RRule from 'rrule';
import { RecurringEvent } from 'src/app/shared/component/calendar/models/recurring-Event.model';
import { CalendarService } from 'src/app/shared/component/calendar/services/calendar.service';

@Component({
  selector: 'app-reserve-configuration',
  templateUrl: './reserve-configuration.component.html',
  styleUrls: ['./reserve-configuration.component.scss'],
})
export class ReserveConfigurationComponent implements OnInit {
  events: CalendarEvent[] = [];
  recurringEvents: RecurringEvent[] = [];
  cols: any[];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.setEvents();
  }

  delete(row: RecurringEvent) {
    //TODO ELIMINAR EN EL SERVIDOR
    const indexRecurring = this.recurringEvents.findIndex(
      (x) =>
        x.title === row.title &&
        x.date?.start === row.date?.start &&
        x.date?.end === row.date?.end
    );

    this.recurringEvents.splice(indexRecurring, 1);
  }

  setClass(newClass: RecurringEvent) {
    this.recurringEvents.push(newClass);
    this.createEvent(newClass);
  }

  createEvent(newClass: RecurringEvent) {
    const rule: RRule = new RRule({
      ...newClass.rrule,
      dtstart: newClass.date?.start,
      until: newClass.date?.end,
    });

    const { title, color } = newClass;
    rule.all().forEach((date) => {
      //TODO CREAR EVENTOS
      /*this.events = [
        ...this.events,
        {
          title,
          color,
          start: date,
          actions: this.actions,
        },
      ];*/
    });
  }

  newEvent() {
    this.calendarService.enableDialogClass(true);
  }

  private setEvents() {
    this.cols = [
      { field: 'title', header: 'Titulo' },
      { field: 'color.primary', header: 'Color primario' },
      { field: 'color.secondary', header: 'Color Secundario' },
      { field: 'rrule.byweekday', header: 'Día' },
      { field: 'hour.start', header: 'Fecha inicio' },
      { field: 'hour.end', header: 'Fecha fin' },
    ];
  }
}
