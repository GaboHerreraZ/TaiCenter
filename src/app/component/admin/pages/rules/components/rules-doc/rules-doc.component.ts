import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RuleType } from 'src/app/shared/component/calendar/models/constant';
import { RuleWod } from 'src/app/shared/models/rule-wod.model';

@Component({
  selector: 'app-rules-doc',
  templateUrl: './rules-doc.component.html',
  styleUrls: ['./rules-doc.component.scss'],
})
export class RulesDocComponent implements OnInit {
  form: FormGroup;
  ruleTypes = [
    {
      label: 'Asistencia',
      value: RuleType.Asistencia,
    },
    {
      label: 'Nota',
      value: RuleType.Nota,
    },
    {
      label: 'Atención',
      value: RuleType.Atencion,
    },
  ];

  constructor(private ref: DynamicDialogRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getForm();
  }

  closeDialog() {
    const rule: RuleWod = { ...this.form.getRawValue() };
    this.ref.close(rule);
  }

  cancelDialog() {
    this.ref.close();
  }

  getForm() {
    this.form = this.fb.group({
      rule: [null, [Validators.required, Validators.max(100)]],
      type: [null, Validators.required],
    });
  }
}
