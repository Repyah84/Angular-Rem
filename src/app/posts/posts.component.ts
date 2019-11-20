import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Post } from './post/post.servise';
import { PostsServise } from './posts.srvise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  showLoad;
  posts: Post[];
  authServUnsub: Subscription;

  constructor(
    private postsServ: PostsServise,
    private router: Router
  ) {
    this.posts = [];
    this.showLoad = true;
  }

  ngOnInit() {
    this.authServUnsub = this.postsServ.getPosts()
    .subscribe({
      next: responsePosts => {
        console.log('ITEMS_LIST', responsePosts);
        this.posts = responsePosts;
        this.showLoad = false;
      },
    });
  }

  onOpenPost() {
    this.postsServ.SubInPosts.next(this.posts);
    this.router.navigate(['/post']);
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
