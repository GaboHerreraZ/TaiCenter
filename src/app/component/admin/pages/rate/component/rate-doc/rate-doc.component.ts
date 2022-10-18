import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Rate } from 'src/app/shared/models/rate.model';

@Component({
  selector: 'app-rate-doc',
  templateUrl: './rate-doc.component.html',
  styleUrls: ['./rate-doc.component.scss'],
})
export class RateDocComponent implements OnInit {
  form: FormGroup;

  constructor(private ref: DynamicDialogRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getForm();
  }

  getForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      subtitle: [null],
      price: [null, Validators.required],
      description: [null, Validators.required],
      wodsNumber: [null],
    });
  }

  closeDialog() {
    const rate: Rate = { ...this.form.getRawValue() };
    this.ref.close(rate);
  }

  cancelDialog() {
    this.ref.close();
  }
}
