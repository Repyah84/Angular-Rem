import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthServise {

  constructor(private afAuth: AngularFireAuth) { }

  async singIn(email: string, password: string) {
    let credential;
    try {
      credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.handleError(error);
    }
    return credential.user;
  }

  async singUp(email: string, password: string) {
    let credential;
    try {
      credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      this.handleError(error);
    }
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

  private handleError(erroRes: any) {
    let errorMessage = 'An unknown error ccured';
    if (!erroRes.code) {
      return errorMessage;
    }
    switch (erroRes.code) {
      case 'auth/invalid-email':
        errorMessage = 'This email exist olready';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This email has been disabled';
        break;
      case 'auth/user-not-found':
        errorMessage = 'This user not found';
        break;
      case 'auth/wrong-password':
        errorMessage = 'This password is not correct';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'This email exist olready';
        break;
    }
    console.log('ERRO_MESSAGE', errorMessage);
    return errorMessage;
  }

}
