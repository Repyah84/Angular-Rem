import { Injectable } from '@angular/core';
import { Post } from './post/post.servise';


@Injectable({providedIn: 'root'})
export class PostsServise {
  posts: Post [];

  constructor() {
    this.posts = [
      {
        title: 'diner',
        comment: 'Veri Deliches',
        date: new Date()
      }
    ];
  }

}
