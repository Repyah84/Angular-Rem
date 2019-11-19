import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Post } from './post/post.servise';
import { PostsServise } from './posts.srvise';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  authServUnsub: Subscription;
  unSubInterval: Subscription;
  posts: Post[];
  items;

  constructor(
    private postsServ: PostsServise,
  ) {
    this.posts = [];
  }

  ngOnInit() {
    this.posts = this.postsServ.posts;
    this.authServUnsub = this.postsServ.getPosts()
      .subscribe({
        next: v => {
          console.log('ITEMS_LIST', v);
          this.posts = v;
        },
      });
  }

  onOpenPost() {
    // this.authServ.createItems(this.posts);
  }

  onDelitePOst() {

  }

  ngOnDestroy() {
    if (!this.authServUnsub) {
      return;
    }
    this.authServUnsub.unsubscribe();
  }
}
