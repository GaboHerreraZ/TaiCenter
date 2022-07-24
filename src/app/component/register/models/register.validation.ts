import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class ValidationRegister {
  static registerValidation(controls: AbstractControl) {
    let hasError = false;
    const email = controls.get('email');
    const repeatEmail = controls.get('repeatEmail');
    const password = controls.get('password');
    const repeatPassword = controls.get('repeatPassword');
    const requiredEmailError = repeatEmail?.hasError('required');
    const requiredPasswordError = repeatPassword?.hasError('required');

    const emailErros =
      email?.value !== repeatEmail?.value
        ? { matchingEmail: true }
        : requiredEmailError
        ? { required: 'true' }
        : null;

    repeatEmail?.setErrors(emailErros);

    const passwordError =
      password?.value !== repeatPassword?.value
        ? { matchingPassword: true }
        : requiredPasswordError
        ? { required: true }
        : null;
    repeatPassword?.setErrors(passwordError);

    hasError = emailErros !== null || passwordError !== null;

    return hasError ? { hasError } : null;
  }
}
