import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthServise {
  userId;
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      console.log('USER_ID', this.userId);
    });
  }

  // createItems(item) {
  //   this.itemsRef.push(item);
  // }
}


