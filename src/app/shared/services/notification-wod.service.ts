import { Injectable } from '@angular/core';
import {
  addDoc,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  orderBy,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { NotificationWod } from '../models/notification-wod.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationWodService {
  constructor(private fireStore: Firestore) {}

  addNewNotification(notification: NotificationWod) {
    const dbInstance = collection(this.fireStore, 'notificationsWod');
    return addDoc(dbInstance, notification);
  }

  getNotifications() {
    const dbInstance = collection(this.fireStore, 'notificationsWod');
    const q = query(dbInstance, orderBy('severity', 'desc'));
    return getDocs(q);
  }

  deletNotificationById(notificationId: string) {
    const docRef = doc(this.fireStore, 'notificationsWod', notificationId);
    return deleteDoc(docRef);
  }
}
