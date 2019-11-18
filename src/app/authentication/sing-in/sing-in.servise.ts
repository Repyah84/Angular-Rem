import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class SingInServise {
  constructor(private afAuth: AngularFireAuth) {}

  async singIn(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return credential.user;
  }
}
