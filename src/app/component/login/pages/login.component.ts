import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RegisterDocComponent } from '../../register/pages/register-doc.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Message } from './models/message';
import { Constants } from '../models/constant';
import { TypeMessage } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private notificacionService: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getForm();
  }

  loginGoogle() {
    this.authService.loginGoogle().then((google) => {
      const email = google.user.email || '';
      if (Constants.EmailAdmin.includes(email)) {
        this.router.navigate(['panel/administrador/configuracion-wods']);
      } else {
        this.router.navigate(['panel/usuario/normas-del-centro']);
      }
    });
  }

  loginFacebook() {
    this.authService.loginFacebook().then(() => {
      this.router.navigate(['panel/usuario/normas-del-centro']);
    });
  }

  async login() {
    this.loadingService.start();
    const { email, password } = this.form.value;
    this.authService
      .loginByCorreoPassword(email, password)
      .then(() => {
        this.router.navigate(['panel/usuario/normas-del-centro']);
        this.loadingService.end();
      })
      .catch(() => {
        this.loadingService.end();
      });
  }

  registrarse() {
    const ref = this.dialogService.open(RegisterDocComponent, {
      header: 'Registro Tai Center',
      width: '50%',
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.saveRegister(result.email, result.password);
      }
    });
  }

  async saveRegister(email: string, password: string) {
    this.loadingService.start();
    const response = await this.authService.registerByEmail(email, password);
    if (response.user) {
      this.notificacionService.createMessage(TypeMessage.Success, [
        Message.newUserOk,
      ]);
    }
    this.loadingService.end();
  }

  private getForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
}
