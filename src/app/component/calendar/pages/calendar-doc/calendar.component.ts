import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { TypeMessage } from 'src/app/shared/services/notification/enum/message';
import RRule from 'rrule';
import { RecurringEvent } from '../../models/recurring-Event.model';
import { format, addDays } from 'date-fns';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Week;
  private destroy$ = new Subject<void>();
  viewDate = new Date();
  locale = 'ES';
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  excludeDays = [DAYS_OF_WEEK.SUNDAY];
  daysInWeek = 6;
  cols: any[];
  recurringEvents: RecurringEvent[] = [
    {
      title: 'Recurs yearly on the 10th of the current month',
      color: {
        primary: '#ff0000',
        secondary: '#ff0025',
      },
      rrule: {
        byweekday: RRule.TU,
      },
      date: {
        start: new Date(),
        end: addDays(new Date(), 7),
      },
    },
  ];

  events: CalendarEvent[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private notificationService: NotificationService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.resizeCalendar();
    this.createEvent();
    this.setEvents();
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

  eventClicked(event: any) {
    this.notificationService.createMessage(
      TypeMessage.Success,
      'Mensaje de prueba perros'
    );
  }

  resizeCalendar() {
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      });
  }

  createEvent() {
    this.recurringEvents.forEach((event) => {
      const rule: RRule = new RRule({
        ...event.rrule,
        dtstart: new Date(),
        until: addDays(new Date(), 7),
      });

      console.log('rule', rule);

      const { title, color } = event;
      rule.all().forEach((date) => {
        this.events.push({
          title,
          color,
          start: date,
        });
      });
    });

    console.log(this.events);
  }

  delete(row: any) {}

  newEvent() {
    this.calendarService.enableDialogClass(true);
  }

  setClass() {
    console.log('clase nueva');
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
