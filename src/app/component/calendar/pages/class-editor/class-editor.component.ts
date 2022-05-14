import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import RRule from 'rrule';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecurringEvent } from '../../models/recurring-Event.model';
import { CalendarService } from '../../services/calendar.service';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';

@Component({
  selector: 'app-class-editor',
  templateUrl: './class-editor.component.html',
  styleUrls: ['./class-editor.component.scss'],
})
export class ClassEditorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService
  ) {}

  display$: Observable<boolean>;
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
      name: [null, Validators.required],
      primaryColor: [null],
      secondaryColor: [null],
      day: [RRule.MO],
      startDate: [new Date()],
      endDate: [new Date()],
    });
  }

  closeDialog() {
    if (this.form.invalid) {
      this.form.controls['name'].markAllAsTouched();
      console.log(this.form.controls);
    }
  }
}
