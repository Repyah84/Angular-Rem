import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, take, tap, retry } from 'rxjs/operators';

import { Post } from './post/post.servise';
import { AuthServise } from '../authentication/auth.servise';


@Injectable({ providedIn: 'root' })
export class PostsServise {

  itemsRef: AngularFireList<any>;
  items: Observable<any>;
  SubInPosts = new BehaviorSubject<any>(null);

  constructor(
    private authServ: AuthServise,
    private db: AngularFireDatabase,
  ) {
  }

  getPosts() {
    console.log('UsrId', this.authServ.userId);
    this.itemsRef = this.db.list(`posts/${this.authServ.userId}`);
    this.items = this.itemsRef.snapshotChanges();
    return this.items.pipe(
      tap(n => {
        console.log('NNNNNNN', n);
      }),
      map(chenges => chenges.map(c => (
        { key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  async delitePOst(key: string) {
    this.itemsRef = this.db.list(`posts/${this.authServ.userId}`);
    await this.itemsRef.remove(key);
  }

}
