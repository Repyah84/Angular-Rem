import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserServise } from '../user/user.servise';


@Injectable({ providedIn: 'root' })

export class PostsServise {

  itemsRef: AngularFireList<any>;
  items: Observable<any>;
  SubInPosts = new BehaviorSubject<any>(null);

  constructor(
    private userServ: UserServise,
    private db: AngularFireDatabase,
  ) { }

  getPosts() {
    this.itemsRef = this.db.list(`posts/${this.userServ.userId}`);
    this.items = this.itemsRef.snapshotChanges();
    return this.items.pipe(
      map(chenges => chenges.map(c => (
        { key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  async delitePost(key: string) {
    this.itemsRef = this.db.list(`posts/${this.userServ.userId}`);
    await this.itemsRef.remove(key);
  }

}
