import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {
    this.auth.setPersistence(browserSessionPersistence);
  }

  public loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public loginFacebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  public loginByCorreoPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public logout() {
    return signOut(this.auth);
  }

  public registerByEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public currentUser() {
    return this.auth.currentUser;
  }
}
