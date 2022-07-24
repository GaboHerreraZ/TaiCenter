import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { ref, uploadBytes } from '@firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  uploadFile(file: any) {
    const storageRef = ref(this.storage, 'nombre.png');
    return uploadBytes(storageRef, file);
  }
}
