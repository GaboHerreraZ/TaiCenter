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
  orderBy,
  deleteDoc,
} from '@angular/fire/firestore';
import { UserDataWod } from '../models/user-data-wod.model';
import { getYear, getMonth, getDate, addDays } from 'date-fns';
import { Attend, WodState } from '../component/calendar/models/constant';
import { State } from '../models/constants';

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

  getUsersInWod(wodId: string) {
    const dbInstance = collection(this.fireStore, 'usersWods');
    const q = query(
      dbInstance,
      where('wodId', '==', wodId),
      where('state', '==', WodState.Activa)
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
        startDate: data['startDate'],
        endDate: data['endDate'],
      });
    });

    return usersDataWods;
  }

  async getUserWodsHistorical(userId: string) {
    const usersDataWods: UserDataWod[] = [];
    const userWods = await this.getUserWodsHistoricalByUserId(userId);
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
        startDate: data['startDate'],
        endDate: data['endDate'],
      });
    });

    return usersDataWods;
  }

  async deleteWodsUser(userId: string) {
    const wods = await this.getUserWods(userId);
    wods.forEach(async (wod) => {
      await this.deleteWod(wod.userWodId || '');
    });
  }

  private deleteWod(wodId: string) {
    const docRef = doc(this.fireStore, 'usersWods', wodId);
    return deleteDoc(docRef);
  }

  private getUserWodsByUserId(userId: string) {
    const currentDay = new Date(
      getYear(new Date()),
      getMonth(new Date()),
      getDate(new Date()),
      7,
      0,
      0,
      0
    );
    const dbInstance = collection(this.fireStore, 'usersWods');
    const q = query(
      dbInstance,
      where('userId', '==', userId),
      where('start', '>=', currentDay)
    );
    return getDocs(q);
  }

  private getUserWodsHistoricalByUserId(userId: string) {
    const currentDay = new Date(
      getYear(new Date()),
      getMonth(new Date()),
      getDate(new Date()),
      7,
      0,
      0,
      0
    );

    const dbInstance = collection(this.fireStore, 'usersWods');
    const q = query(
      dbInstance,
      where('userId', '==', userId),
      where('startDate', '>=', addDays(currentDay, -30)),
      where('startDate', '<=', currentDay)
    );
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

    let endDay = addDays(currentDay, 7);
    const dbInstance = collection(this.fireStore, 'usersWods');
    const q = query(
      dbInstance,
      where('start', '>=', currentDay),
      where('start', '<=', endDay)
    );
    return getDocs(q);
  }

  getHistoricalDaysWods() {
    const currentDay = new Date(
      getYear(new Date()),
      getMonth(new Date()),
      getDate(new Date()),
      0,
      0,
      0,
      0
    );

    let endDay = addDays(currentDay, -7);
    const dbInstance = collection(this.fireStore, 'usersWods');
    const q = query(
      dbInstance,
      where('start', '>=', endDay),
      where('start', '<=', currentDay)
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
