import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  NotificationSeverity,
  NotificationSummary,
} from 'src/app/shared/component/calendar/models/constant';
import { NotificationWod } from 'src/app/shared/models/notification-wod.model';

@Component({
  selector: 'app-notification-doc',
  templateUrl: './notification-doc.component.html',
  styleUrls: ['./notification-doc.component.scss'],
})
export class NotificationDocComponent implements OnInit {
  form: FormGroup;
  notificationType = [
    {
      label: 'Informativa',
      value: NotificationSeverity.Info,
      summary: NotificationSummary.Info,
    },
    {
      label: 'Atención',
      value: NotificationSeverity.Atencion,
      summary: NotificationSummary.Atencion,
    },
  ];

  constructor(private ref: DynamicDialogRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getForm();
    this.severityChanges();
  }

  closeDialog() {
    const notification: NotificationWod = { ...this.form.getRawValue() };
    this.ref.close(notification);
  }

  cancelDialog() {
    this.ref.close();
  }

  getForm() {
    this.form = this.fb.group({
      severity: [null, Validators.required],
      detail: [null, [Validators.required, Validators.max(100)]],
      summary: [null],
    });
  }

  severityChanges() {
    this.form.controls['severity'].valueChanges.subscribe((value) => {
      const summary = this.notificationType.find(
        (n) => n.value === value
      )?.summary;
      this.form.patchValue({ summary });
    });
  }
}
