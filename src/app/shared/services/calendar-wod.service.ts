import { Injectable } from '@angular/core';
import {
  addDoc,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { RecurringWod } from '../models/recurring-wod.model';
import { Wod } from '../models/wod.model';
import { WodConfiguration } from '../models/wod-configuration.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarWodService {
  consultaEvents = new BehaviorSubject<boolean>(true);
  consultaEvents$ = this.consultaEvents.asObservable();

  constructor(private fireStore: Firestore) {}

  addWods(wods: RecurringWod) {
    const dbInstance = collection(this.fireStore, 'wodConfiguration');
    return addDoc(dbInstance, wods);
  }

  addEventWod(wods: Wod[]) {
    const dbInstance = collection(this.fireStore, 'wod');
    return new Promise((resolve) => {
      wods.forEach(async (e) => {
        await addDoc(dbInstance, e);
      });
      resolve(true);
    });
  }

  getWodsById(wodId: string) {
    const userRef = doc(this.fireStore, 'wodConfiguration', wodId);
    return getDoc(userRef);
  }

  getWods() {
    const dbInstance = collection(this.fireStore, 'wod');
    const q = query(dbInstance);
    return getDocs(q);
  }

  async getConfigurationWods() {
    const dbInstance = collection(this.fireStore, 'wodConfiguration');
    const q = query(dbInstance);
    const docs = await getDocs(q);
    const wodList: WodConfiguration[] = [];
    docs.forEach((d) => {
      wodList.push({
        uid: d.id,
        recurringEvents: d.data() as RecurringWod,
      });
    });
    return wodList;
  }

  deleteClass(uidWod: string) {
    const docRef = doc(this.fireStore, 'wodConfiguration', uidWod);
    return deleteDoc(docRef);
  }

  getEventsByWodId(wodId: string) {
    const wodRef = collection(this.fireStore, 'wod');
    const q = query(wodRef, where('ccId', '==', wodId));
    return getDocs(q);
  }

  deleteWodById(wodId: string) {
    const docRef = doc(this.fireStore, 'wod', wodId);
    return deleteDoc(docRef);
  }
}
