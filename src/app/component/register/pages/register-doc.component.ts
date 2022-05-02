import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register-doc.component.html',
  styleUrls: ['./register-doc.component.scss'],
})
export class RegisterDocComponent implements OnInit {
  file: File;
  gender = [
    {
      name: 'Hombre',
      code: 'H',
    },
    { name: 'Mujer', code: 'M' },
  ];

  imageUrl: string | ArrayBuffer | null | undefined =
    '../../../assets/img/default.png';
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.getForm();
  }

  myUploader(event: any) {
    if (event) {
      this.file = event.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  private getForm() {
    return this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      gender: [null, Validators.required],
      email: [null, Validators.required],
      repeatEmail: [null, Validators.required],
      password: [null, Validators.required],
      repeatPassword: [null, Validators.required],
    });
  }

  save() {}
}
