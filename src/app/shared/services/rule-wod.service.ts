import { Injectable } from '@angular/core';
import {
  addDoc,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { RuleWod } from '../models/rule-wod.model';

@Injectable({
  providedIn: 'root',
})
export class RuleWodService {
  constructor(private fireStore: Firestore) {}

  addNewRule(rule: RuleWod) {
    const dbInstance = collection(this.fireStore, 'rulesWod');
    return addDoc(dbInstance, rule);
  }

  getRules() {
    const dbInstance = collection(this.fireStore, 'rulesWod');
    const q = query(dbInstance, orderBy('type', 'asc'));
    return getDocs(q);
  }

  deleteRuleById(ruleId: string) {
    const docRef = doc(this.fireStore, 'rulesWod', ruleId);
    return deleteDoc(docRef);
  }
}
