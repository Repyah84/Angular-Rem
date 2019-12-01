import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthServise {

  showAuthElem = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth) {}

  // chengeShowAuthElem() {
  //   this.showAuthElem = !this.showAuthElem;
  // }

  async singIn(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return credential.user;
  }

  async singUp(email: string, password: string) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return credential.user;
  }

  async googleAuth() {
    const credential = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return credential.user;
  }

  async fasebookAuth() {
    const credential = await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    return credential.user;
  }

}
