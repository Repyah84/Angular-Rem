import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

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
  user$: Observable<any>;
  itemRef$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.userId = null;
    this.userKey = null;

    this.user$ = this.afAuth.authState
      .pipe(
        tap(user => {
          if (user) {
            this.userId = user.uid;
          }
        })
      );
  }

  getUserInfo(userId: string): Observable<any> {
    return this.itemRef$ = this.db.list(`users/${userId}`)
    .snapshotChanges()
    .pipe(
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

  async checkUserInfo(userId: string): Promise<any> {
    const userInfo = await this.db.list(`users/${userId}`)
      .valueChanges()
      .pipe(take(1))
      .toPromise();
    return userInfo;
  }

  async initUserInfo(user: User, userId: string): Promise<any> {
    const userInfoRef = await this.db.list(`users/${userId}`).push(user);
    return userInfoRef;
  }

  async updatingUserInfo(user: User) {
    await this.db.list(`users/${this.userId}`).update(this.userKey, user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }
}
