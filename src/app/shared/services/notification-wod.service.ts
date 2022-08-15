import { Injectable } from '@angular/core';
import {
  addDoc,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
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
    const q = query(dbInstance);
    return getDocs(q);
  }

  updateNotification(notification: NotificationWod, notificationId: string) {
    const notificationRef = doc(
      this.fireStore,
      'notificationsWod',
      notificationId
    );
    return updateDoc(notificationRef, { ...notification });
  }

  deletNotificationById(notificationId: string) {
    const docRef = doc(this.fireStore, 'notificationsWod', notificationId);
    return deleteDoc(docRef);
  }
}
