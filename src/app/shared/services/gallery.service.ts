import { Injectable } from '@angular/core';
import { Firestore, getDocs, orderBy, query } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Storage, ref, listAll } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private fireStore: Firestore, private storage: Storage) {}

  getOcrs() {
    const dbInstance = collection(this.fireStore, 'ocr');
    const q = query(dbInstance, orderBy('cities', 'desc'));
    return getDocs(q);
  }

  getImagesByOcr(city: string) {
    const imagesRef = ref(this.storage, city);
    return listAll(imagesRef);
  }
}
