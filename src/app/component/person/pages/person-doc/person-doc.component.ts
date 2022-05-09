import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person-doc.component.html',
  styleUrls: ['./person-doc.component.scss'],
})
export class PersonDocComponent implements OnInit {
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

  products = [
    {
      date: '01/02/2022',
      lessonType: 'GAP',
      status: 'No',
      active: false,
    },
    {
      date: '01/02/2022',
      lessonType: 'HIT',
      status: 'Si',
      active: false,
    },
    {
      date: '01/02/2022',
      lessonType: 'CROSS',
      status: 'Si',
      active: false,
    },
    {
      date: '01/02/2022',
      lessonType: 'CROSS',
      status: 'Pendiente',
      active: true,
    },
  ];

  cols: any[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('persona');
    this.formGroup = this.getForm();

    this.cols = [
      { field: 'date', header: 'Fecha' },
      { field: 'lessonType', header: 'Tipo de clase' },
      { field: 'status', header: 'Asistió' },
      { field: 'active', header: 'Estado' },
    ];
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
      mote: [null, Validators.required],
      remainingLessons: [{ value: 0, disabled: true }],
      plan: [{ value: 'Básico', disabled: true }],
      state: [],
    });
  }

  save() {}

  reservar() {}

  delete(row: any) {}
}
