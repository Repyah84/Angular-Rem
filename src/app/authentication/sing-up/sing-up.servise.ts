import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class SingUpServise {
  constructor(private afAuth: AngularFireAuth) { }

  async singUp(email: string, password: string) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return credential.user;
  }
}
