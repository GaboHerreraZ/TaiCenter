import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import RRule, { Weekday } from 'rrule';
import { RecurringWod } from '../../../../models/recurring-wod.model';
import { CalendarService } from '../../services/calendar.service';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { addDays } from 'date-fns';
import { CalendarWodService } from 'src/app/shared/services/calendar-wod.service';
import { Wod } from 'src/app/shared/models/wod.model';
import { Messages } from 'src/app/shared/models/message';
import { LoadingService } from '../../../loading/shared/loading.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Days, WodColors, Wods } from '../../models/constant';
import { State, TypeMessage } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-wod-editor',
  templateUrl: './wod-editor.component.html',
  styleUrls: ['./wod-editor.component.scss'],
})
export class WodEditorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private notificationService: NotificationService,
    private calendarWodService: CalendarWodService,
    private loadingService: LoadingService,
    private ref: DynamicDialogRef
  ) {}

  minDateFechaFin: Date = addDays(new Date(), 7);
  minDateFechaInicio = new Date();
  form: FormGroup;
  days = [
    { name: Days.Lunes, code: RRule.MO },
    { name: Days.Martes, code: RRule.TU },
    { name: Days.Miercoles, code: RRule.WE },
    { name: Days.Jueves, code: RRule.TH },
    { name: Days.Viernes, code: RRule.FR },
    { name: Days.Sabado, code: RRule.SA },
  ];

  wods = [
    {
      name: Wods.OpenCenter,
      code: Wods.OpenCenter,
      primaryColor: WodColors.OpenCenter,
      secondaryColor: WodColors.OpenCenter,
    },
    {
      name: Wods.Hiit,
      code: Wods.Hiit,
      primaryColor: WodColors.Hiit,
      secondaryColor: WodColors.Hiit,
    },
    {
      name: Wods.Cross,
      code: Wods.Cross,
      primaryColor: WodColors.Cross,
      secondaryColor: WodColors.Cross,
    },
    {
      name: Wods.Gap,
      code: Wods.Gap,
      primaryColor: WodColors.Gap,
      secondaryColor: WodColors.Gap,
    },
    {
      name: Wods.Tabata,
      code: Wods.Tabata,
      primaryColor: WodColors.Tabata,
      secondaryColor: WodColors.Tabata,
    },
  ];

  @Output()
  createdClass = new EventEmitter<boolean>();

  ngOnInit(): void {
    flatpickr.localize(Spanish);
    this.getForm();
  }

  onHideDialog() {}

  getForm() {
    this.form = this.fb.group({
      name: [Wods.Cross, Validators.required],
      primaryColor: [{ value: '#f9fb79', disabled: true }],
      secondaryColor: [{ value: '#f9fb79', disabled: true }],
      day: [RRule.MO],
      startDate: [this.minDateFechaInicio],
      endDate: [null, Validators.required],
    });

    this.changeFechaInicio();
    this.clasesChanges();
  }

  public closeDialog() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const weekDay = { weekDay: value.day.weekday };

    const newClass = {
      title: value.name,
      color: {
        primary: value.primaryColor,
        secondary: value.secondaryColor,
      },
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [weekDay],
      },
      date: {
        start: value.startDate,
        end: value.endDate,
      },
      state: State.Activa,
    };

    this.saveClass(newClass);
  }

  async saveClass(newClass: RecurringWod) {
    const response = await this.calendarWodService.addWods(newClass);
    const classConfiguration = await this.calendarWodService.getWodsById(
      response.id
    );
    const events = this.createEvent(classConfiguration.data(), response.id);
    this.calendarWodService
      .addEventWod(events)
      .then(() => {
        this.getForm();
        this.cancelDialog();
        this.notificationService.createMessage(TypeMessage.Success, [
          Messages.classesCreatedOk,
        ]);
        this.ref.close(true);
      })
      .catch(() => {
        this.notificationService.createMessage(TypeMessage.Error, [
          Messages.classesCreatedKo,
        ]);
        this.loadingService.end();
      });
  }

  public cancelDialog() {
    this.calendarService.enableDialogClass(false);
  }

  private changeFechaInicio() {
    this.form.controls['startDate'].valueChanges.subscribe((startDate) => {
      this.minDateFechaFin = addDays(startDate, 7);
    });
  }

  createEvent(newClass: any, ccid: string) {
    const newByWeekDay = newClass.rrule?.byweekday?.map(
      (x: any) => new Weekday(x.weekDay)
    );
    const rule: RRule = new RRule({
      ...newClass.rrule,
      dtstart: newClass.date?.start.toDate(),
      until: newClass.date?.end.toDate(),
      byweekday: newByWeekDay,
    });
    const events: Wod[] = [];
    const { title, color } = newClass;
    rule.all().forEach((date) => {
      events.push({
        ccId: ccid,
        title,
        color,
        start: date,
      });
    });

    return events;
  }

  private clasesChanges() {
    this.form.controls['name'].valueChanges.subscribe((value) => {
      const wod = this.wods.find((w) => w.code === value);
      this.form.patchValue({
        primaryColor: wod?.primaryColor,
        secondaryColor: wod?.secondaryColor,
      });
    });
  }
}
