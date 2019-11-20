import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Post } from './post/post.servise';
import { AuthServise } from '../authentication/auth.servise';


@Injectable({providedIn: 'root'})
export class PostsServise {
  posts: Post [];

  itemsRef: AngularFireList<any>;
  items: Observable<any>;

  constructor(
    private authServ: AuthServise,
    private db: AngularFireDatabase,
    ) {
    this.posts = [];
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
          {key: c.payload.key, ...c.payload.val()}))
        )
      );
    }

}
