import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  endAt,
} from '@angular/fire/firestore';
import { UserDataWod } from '../models/user-data-wod.model';
import {
  addDays,
  getDay,
  getYear,
  getMonth,
  addHours,
  format,
  getDate,
} from 'date-fns';
import { Attend, WodState } from '../component/calendar/models/constant';

@Injectable({
  providedIn: 'root',
})
export class WodService {
  constructor(private fireStore: Firestore) {}

  addUserWod(userWod: UserDataWod) {
    const dbInstance = collection(this.fireStore, 'usersWods');
    return addDoc(dbInstance, userWod);
  }

  updateWod(userWodId: any, userWod: UserDataWod) {
    const userWodRef = doc(this.fireStore, 'usersWods', userWodId);
    return updateDoc(userWodRef, { ...userWod });
  }

  getWodById(wodId: string) {
    const wodRef = doc(this.fireStore, 'wod', wodId);
    return getDoc(wodRef);
  }

  getWodsByUserIdAndWodId(wodId: string, userId?: string) {
    const dbInstance = collection(this.fireStore, 'usersWods');
    const q = query(
      dbInstance,
      where('userId', '==', userId),
      where('wodId', '==', wodId)
    );
    return getDocs(q);
  }

  async getUserWods(userId: string) {
    const usersDataWods: UserDataWod[] = [];
    const userWods = await this.getUserWodsByUserId(userId);
    userWods.forEach((userWod) => {
      const data = userWod.data();
      usersDataWods.push({
        userId,
        wodId: data['wodId'],
        attend: data['attend'],
        state: data['state'],
        title: data['title'],
        start: data['start'].toDate(),
        userWodId: userWod.id,
        userName: data['userName'],
        lastName: data['lastName'],
      });
    });

    return usersDataWods;
  }

  private getUserWodsByUserId(userId: string) {
    const dbInstance = collection(this.fireStore, 'usersWods');
    const q = query(dbInstance, where('userId', '==', userId));
    return getDocs(q);
  }

  getDaysWods() {
    const currentDay = new Date(
      getYear(new Date()),
      getMonth(new Date()),
      getDate(new Date()),
      7,
      0,
      0,
      0
    );

    let endDay = addHours(currentDay, 14);
    endDay = addDays(endDay, 1); //TODO PENDIENTE REVISAR

    const dbInstance = collection(this.fireStore, 'usersWods');
    const q = query(
      dbInstance,
      where('start', '>=', currentDay),
      where('start', '<=', endDay)
    );
    return getDocs(q);
  }

  async confirmWod(userId: any, wodId: string) {
    const dataWods = await this.getWodsByUserIdAndWodId(wodId, userId);
    dataWods.forEach(async (data) => {
      const dataWod: any = data.data();
      dataWod['attend'] = Attend.Si;
      dataWod['state'] = WodState.Realizada;
      await this.updateWod(data.id, dataWod);
    });
  }

  async confirmNoWod(userId: any, wodId: string) {
    const dataWods = await this.getWodsByUserIdAndWodId(wodId, userId);
    dataWods.forEach(async (data) => {
      const dataWod: any = data.data();
      dataWod['attend'] = Attend.No;
      dataWod['state'] = WodState.Realizada;
      await this.updateWod(data.id, dataWod);
    });
  }
}
