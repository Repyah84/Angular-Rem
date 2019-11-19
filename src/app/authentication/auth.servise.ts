import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';

import { Observable } from 'rxjs';

export interface Item {
  dody: string;
}

@Injectable({providedIn: 'root'})
export class AuthServise {
  userId;
  itemsRef: AngularFireList<any>;
  items: Observable<any>;
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      console.log('USER_ID', this.userId);
    });
  }

  getItemList() {
    if (!this.userId) {
      return;
    }
    this.itemsRef = this.db.list(`posts/${this.userId}`);
    return this.items = this.itemsRef.snapshotChanges();
  }

  createItems(item) {
    this.itemsRef.push(item);
  }
}


