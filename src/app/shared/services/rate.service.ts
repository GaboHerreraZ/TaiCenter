import { Injectable } from '@angular/core';
import { collection } from '@firebase/firestore';
import { Rate } from '../models/rate.model';
import {
  addDoc,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  orderBy,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor(private fireStore: Firestore) {}

  addNewRate(rate: Rate) {
    const dbInstance = collection(this.fireStore, 'rates');
    return addDoc(dbInstance, rate);
  }

  getRates() {
    const dbInstance = collection(this.fireStore, 'rates');
    const q = query(dbInstance, orderBy('price', 'asc'));
    return getDocs(q);
  }

  deletRateById(rateId: string) {
    const docRef = doc(this.fireStore, 'rates', rateId);
    return deleteDoc(docRef);
  }
}
