import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getForm();
  }

  closeDialog() {
    const suggestion = { ...this.form.getRawValue() };
    this.ref.close(suggestion);
  }

  cancelDialog() {
    this.ref.close(true);
  }

  private getForm() {
    this.form = this.fb.group({
      suggestion: [null, [Validators.required, Validators.maxLength(100)]],
    });
  }
}
