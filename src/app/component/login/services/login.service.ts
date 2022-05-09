import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public auth: AngularFireAuth) {}

  public loginGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((c) => {
        console.log('c', c);
      });
  }

  public loginFacebook() {
    this.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((f) => {
        console.log('f', f);
      });
  }
}
