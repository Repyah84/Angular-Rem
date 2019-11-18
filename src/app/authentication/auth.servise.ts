import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthServise {

  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.user$ = this.db.object('items').valueChanges();
  }

}
