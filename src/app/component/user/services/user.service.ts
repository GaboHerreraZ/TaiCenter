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
import { UserWod } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  dataUser: UserWod;

  constructor(private fireStore: Firestore) {}

  getUsers() {
    const dbInstance = collection(this.fireStore, 'users');
    const q = query(dbInstance);
    return getDocs(q);
  }

  addUser(user: UserWod, authId: string) {
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

  setUserWod(user: UserWod) {
    this.dataUser = user;
    console.log('this.dataUser', this.dataUser);
  }

  getUserWod() {
    return this.dataUser;
  }
}
