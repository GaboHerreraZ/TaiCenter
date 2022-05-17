import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import RRule from 'rrule';
import { Observable } from 'rxjs';
import { RecurringEvent } from '../../models/recurring-Event.model';
import { CalendarService } from '../../services/calendar.service';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { TypeMessage } from 'src/app/shared/services/notification/enum/message';
import { addDays } from 'date-fns';

@Component({
  selector: 'app-class-editor',
  templateUrl: './class-editor.component.html',
  styleUrls: ['./class-editor.component.scss'],
})
export class ClassEditorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private notificationService: NotificationService
  ) {}

  display$: Observable<boolean>;
  minDateFechaFin: Date = addDays(new Date(), 7);
  minDateFechaInicio = new Date();
  form: FormGroup;
  days = [
    { name: 'Lunes', code: RRule.MO },
    { name: 'Martes', code: RRule.TU },
    { name: 'Miercoles', code: RRule.WE },
    { name: 'Jueves', code: RRule.TH },
    { name: 'Viernes', code: RRule.FR },
    { name: 'Sábado', code: RRule.SA },
  ];

  @Output()
  classValue = new EventEmitter<RecurringEvent>();

  ngOnInit(): void {
    flatpickr.localize(Spanish);
    this.getForm();
    this.display$ = this.calendarService.displayDialogClass$;
  }

  onHideDialog() {}

  getForm() {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      colorPrimario: ['#F97B7B'],
      colorSecundario: ['#FFFFFF'],
      dia: [RRule.MO],
      fechaInicio: [this.minDateFechaInicio],
      fechaFin: [this.minDateFechaFin],
    });

    this.changeFechaInicio();
  }

  closeDialog() {
    if (this.form.invalid) {
      this.notificationService.createMessage(
        TypeMessage.Error,
        this.getErrorForm()
      );
      return;
    }
    const value = this.form.value;

    this.classValue.emit({
      title: value.nombre,
      color: {
        primary: value.colorPrimario,
        secondary: value.colorSecundario,
      },
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [value.dia],
      },
      date: {
        start: value.fechaInicio,
        end: value.fechaFin,
      },
    });
    this.getForm();
    this.cancelDialog();
  }

  getErrorForm(): any {
    const errorMessage: any[] = [];
    const controlNames = Object.keys(this.form.controls);
    controlNames.forEach((controlName: string) => {
      const error = this.form.controls[controlName].errors;
      if (error !== null) {
        const errorControl = Object.keys(error);
        errorControl.forEach((errorType) => {
          errorMessage.push({
            controlName,
            errorType,
          });
        });
      }
    });

    return this.buildMessage(errorMessage);
  }

  private buildMessage(errors: any[]) {
    return errors.map((error) => {
      let message;
      switch (error.errorType) {
        case 'required':
          message = `${error.controlName} es requerido`;
      }
      return message;
    });
  }

  cancelDialog() {
    this.calendarService.enableDialogClass(false);
  }

  changeFechaInicio() {
    this.form.controls['fechaInicio'].valueChanges.subscribe((fechaInicio) => {
      this.minDateFechaFin = addDays(fechaInicio, 7);
    });
  }
}
