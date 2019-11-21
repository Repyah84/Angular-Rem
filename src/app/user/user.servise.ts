import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface User {
  userEmail?: string;
  userName?: string;
  userAge?: number;
  userHeight?: string;
  userWeight?: string;
}

@Injectable({providedIn: 'root'})
export class UserServise {

  userId;
  userKey;
  user$: Observable<any>;
  items$: Observable<any>;
  itemRef$: AngularFireList<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('USER_IUSERRRRRR', user);
        this.userId = user.uid;
      }
      console.log('USER_ID', this.userId);
    });
  }

  getUserInfo() {
    this.itemRef$ = this.db.list(`users/${this.userId}`);
    this.items$ = this.itemRef$.snapshotChanges();
    return this.items$.pipe(
      tap(n => {
        console.log('USER INFO RESPONSE', n);
      }),
      map(chenges => chenges.map(c => (
        { key: c.payload.key, ...c.payload.val() }))
      ),
      tap(value => {
        this.userKey = value.key;
        console.log('USER_KEYYYYYY', this.userKey);
      })
    );
  }

  async initUserInfo(user: User) {
    const userInfoRef = this.db.list(`users/${this.userId}`);
    const userInfo = await userInfoRef.push(user);
    return userInfo;
  }

  async updatingUserInfo(user: User) {
    const userInfoUp = this.db.list(`users/${this.userId}`);
    await userInfoUp.update(this.userKey, user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }
}
