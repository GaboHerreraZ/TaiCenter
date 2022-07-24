import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import ValidationRegister from '../models/register.validation';

@Component({
  selector: 'app-register',
  templateUrl: './register-doc.component.html',
  styleUrls: ['./register-doc.component.scss'],
})
export class RegisterDocComponent implements OnInit {
  formGroup: FormGroup;

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.getForm();
  }

  private getForm() {
    this.formGroup = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        repeatEmail: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        repeatPassword: [null, [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [ValidationRegister.registerValidation],
      }
    );
  }

  async save() {
    const { email, password } = this.formGroup.value;
    this.ref.close({ email, password });
  }
}
