import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

export interface User {
  userEmail?: string;
  userName?: string;
  userAge?: number;
  userHeight?: string;
  userWeight?: string;
}

@Injectable({ providedIn: 'root' })
export class UserServise {

  userId;
  userKey;
  items$: Observable<any>;
  itemRef$: AngularFireList<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.userKey = null;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('USER_IUSERRRRRR', user);
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
      console.log('USER_ID', this.userId);
    });
  }

  getUserInfo(userId: string = this.userId) {
    this.itemRef$ = this.db.list(`users/${userId}`);
    this.items$ = this.itemRef$.snapshotChanges();
    return this.items$.pipe(
      map(responseUserinfo => (
        {
          key: responseUserinfo[0].payload.key,
          ...responseUserinfo[0].payload.val()
        }
      )),
      tap(elem => {
        this.userKey = elem.key;
        console.log('USER_KEYYYYYYYY', this.userKey);
      }),
    );
  }

  async checkUserInfo(userId: string) {
    const userInfo = await this.db.list(`users/${userId}`)
    .valueChanges()
    .pipe(take(1))
    .toPromise();
    return userInfo;
  }

  async initUserInfo(user: User, id: string = this.userId) {
    const userInfoRef = this.db.list(`users/${id}`);
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
