import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  getDocs,
} from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { UserState } from 'src/app/shared/models/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserWod } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  dataUser: UserWod;

  constructor(private fireStore: Firestore, private authService: AuthService) {}

  async resolve() {
    const user: any = this.authService.currentUser();
    console.log(user);
    return await this.getUserById(user?.uid);
  }

  getUsers() {
    const dbInstance = collection(this.fireStore, 'users');
    const q = query(dbInstance);
    return getDocs(q);
  }

  addUser(user: UserWod, authId: string) {
    user.state = UserState.Pendiente;
    const dbInstance = collection(this.fireStore, 'users');
    return setDoc(doc(dbInstance, authId), user);
  }

  updateUser(user: UserWod, authId: string) {
    const userRef = doc(this.fireStore, 'users', authId);
    return updateDoc(userRef, { ...user });
  }

  getUserById(authId: string) {
    const userRef = doc(this.fireStore, 'users', authId);
    return getDoc(userRef);
  }
}
