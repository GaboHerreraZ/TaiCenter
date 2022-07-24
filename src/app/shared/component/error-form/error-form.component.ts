import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, tap } from 'rxjs';
import { ErrorForm } from '../../models/errorForm.model';
import { Messages } from '../../models/message';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss'],
})
export class ErrorFormComponent implements OnInit {
  @Input()
  form: FormGroup;
  errors: ErrorForm[] = [];

  get showErrors() {
    return this.errors.some((e) => e.touched);
  }
  constructor() {}

  ngOnInit(): void {
    console.log('this.form', this.form);
    this.form.valueChanges
      .pipe(
        filter(() => this.form.touched),
        tap(() => this.markAsTouched())
      )
      .subscribe((s) => {
        this.getErrors();
      });
  }

  getErrors() {
    this.errors = [];
    const keys = Object.keys(this.form.controls);
    keys.forEach((control) => {
      const ctrl = this.form.controls[control];
      const c = ctrl.errors as any;
      if (c) {
        const keysError = Object.keys(c);
        keysError.forEach((key) => {
          switch (key) {
            case 'required':
              this.setError({
                control,
                message: Messages.requiredMessage,
                type: 'required',
                touched: ctrl.touched,
              });
              break;
            case 'matchingEmail':
              this.setError({
                control,
                message: Messages.matchingEmail,
                type: 'matchingEmail',
                touched: ctrl.touched,
              });
              break;
            case 'matchingPassword':
              this.setError({
                control,
                message: Messages.matchingPassWord,
                type: 'matchingPassword',
                touched: ctrl.touched,
              });
              break;
            case 'email':
              this.setError({
                control,
                message: Messages.email,
                type: 'email',
                touched: ctrl.touched,
              });
              break;
            case 'minlength':
              this.setError({
                control,
                message: Messages.minLength.replace(
                  '{0}',
                  c?.minlength.requiredLength
                ),
                type: 'minlength',
                touched: ctrl.touched,
              });
              break;
            default:
              break;
          }
        });
      }
    });
  }

  private setError(error: ErrorForm) {
    this.errors.push(error);
  }

  private markAsTouched() {
    const keysControls = Object.keys(this.form.controls);
    keysControls.forEach((key) => this.form.controls[key].markAsTouched());
  }
}
