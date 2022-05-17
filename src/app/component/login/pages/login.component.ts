import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  navigate() {
    this.router.navigate(['persona']);
  }

  loginGoogle() {
    this.loginService.loginGoogle();
  }

  loginFacebook() {
    this.loginService.loginFacebook();
  }

  login() {
    //TODO WHEN ALL IS OK, GO TO PERSONA
    this.router.navigate(['panel/usuario']);
  }
}
