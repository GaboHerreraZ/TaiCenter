import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { TypeMessage } from 'src/app/shared/services/notification/enum/message';
import { RecurringEvent } from '../../models/recurring-Event.model';
import { CalendarService } from '../../services/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';

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
  recurringEvents: RecurringEvent[] = [];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="pi pi-trash"></i>',
      a11yLabel: 'Eliminar clase',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteClass(event);
      },
    },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private notificationService: NotificationService,
    private breadCrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe((params: any) => {
      this.breadCrumbService.setBreadCrumb(params.breadcrumb);
    });
  }

  ngOnInit(): void {
    this.resizeCalendar();
  }

  eventClicked(event: any) {
    this.notificationService.createMessage(TypeMessage.Success, [
      'Mensaje de prueba perros',
    ]);
  }

  deleteClass(event: CalendarEvent) {
    this.events = this.events.filter((iEvent) => iEvent !== event);
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
