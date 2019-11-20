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

  posts: Post[];
  authServUnsub: Subscription;

  constructor(
    private postsServ: PostsServise,
  ) {
    this.posts = this.postsServ.posts || [];
  }

  ngOnInit() {
    // this.posts = this.postsServ.posts;
    this.authServUnsub = this.postsServ.getPosts()
    .subscribe({
      next: v => {
        console.log('ITEMS_LIST', v);
        this.postsServ.posts = v;
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
