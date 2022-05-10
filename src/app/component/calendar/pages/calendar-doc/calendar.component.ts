import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { setMinutes, setHours } from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { TypeMessage } from 'src/app/shared/services/notification/enum/message';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Week;

  viewDate = new Date();
  locale = 'ES';
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  excludeDays = [DAYS_OF_WEEK.SUNDAY];
  daysInWeek = 6;

  events: CalendarEvent[] = [
    {
      start: setHours(setMinutes(new Date(), 0), 15),
      end: setHours(setMinutes(new Date(), 60), 16),
      title: 'Cross',
      resizable: {
        afterEnd: true,
      },
    },
    {
      start: setHours(setMinutes(new Date(), 0), 16),
      end: setHours(setMinutes(new Date(), 60), 17),
      title: 'Hit',
      resizable: {
        afterEnd: true,
      },
    },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.resizeCalendar();
  }

  refresh = new Subject<void>();
  private destroy$ = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  eventClicked(event: any) {
    console.log(event);
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

  ngOnDestroy() {
    this.destroy$.next();
  }
}
