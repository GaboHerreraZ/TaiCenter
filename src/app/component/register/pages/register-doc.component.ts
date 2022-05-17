import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-doc.component.html',
  styleUrls: ['./register-doc.component.scss'],
})
export class RegisterDocComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.getForm();
  }

  private getForm() {
    return this.fb.group({
      email: [null, Validators.required],
      repeatEmail: [null, Validators.required],
      password: [null, Validators.required],
      repeatPassword: [null, Validators.required],
    });
  }

  save() {
    this.loadingService.start();
    setTimeout(() => {
      this.router.navigate(['panel/persona']);
      this.loadingService.end();
    }, 2000);
  }
}
