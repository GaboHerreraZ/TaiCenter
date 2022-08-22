import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { map, mergeMap, Subject, takeUntil } from 'rxjs';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CalendarWodService } from 'src/app/shared/services/calendar-wod.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '@angular/fire/auth';
import { Constants } from 'src/app/component/login/models/constant';
import { LoadingService } from '../../../loading/shared/loading.service';

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
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  unsubscribe = new Subject();
  user: User | null;

  @Output() deleteEvent = new EventEmitter<CalendarEvent>();
  @Output() selectEvent = new EventEmitter<CalendarEvent>();

  deleteActions = {
    label: '<i class="pi pi-trash"></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.deleteEvent.emit(event);
    },
  };

  @Output() saveClass = new EventEmitter<CalendarEvent>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private calendarWodService: CalendarWodService,
    private authService: AuthService,
    private loadingServie: LoadingService
  ) {
    this.user = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.getEventsWods();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.unsubscribe.next(null);
  }

  eventClicked(event: any) {
    this.saveClass.emit(event);
  }

  private resizeCalendar() {
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

  private getEventsWods() {
    this.loadingServie.start();
    this.calendarWodService.consultaEvents$
      .pipe(
        takeUntil(this.unsubscribe),
        mergeMap(() => {
          return this.calendarWodService.getWods();
        }),
        map((events: any) => {
          const newEvents: any = [];
          events.forEach((e: any) => {
            newEvents.push({ id: e.id, data: e.data() });
          });
          return newEvents;
        })
      )
      .subscribe((s) => {
        this.assignEventsCalendar(s);
        this.loadingServie.end();
      });
  }

  private assignEventsCalendar(events: any[]) {
    this.events = [];
    if (events.length > 0) {
      events.forEach((e) => {
        const actions = this.getActionsByUser(e.data.start.toDate());
        this.events.push({
          id: e.id,
          title: e.data.title,
          color: {
            primary: e.data.color.primary,
            secondary: e.data.color.secondary,
          },
          start: e.data.start.toDate(),
          actions: actions,
        });
      });
    } else {
      this.events = events;
    }
    this.refresh.next();
  }

  private getActionsByUser(eventDate: Date) {
    return this.user?.email === Constants.EmailAdmin && eventDate > new Date()
      ? [this.deleteActions]
      : [];
  }
}
