import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Post } from './post.servise';
import { PostsServise } from '../posts.srvise';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  post: Post;
  unSubPosts: Subscription;

  constructor(
    private postsServ: PostsServise,
    private router: Router
  ) { }

  ngOnInit() {
    this.unSubPosts = this.postsServ.SubInPosts
      .subscribe({
        next: responsePost => {
          if (!responsePost) {
            this.router.navigate(['/posts']);
          }
          this.post = responsePost;
        },
      });
  }

  onDeletePost(key: string) {
    this.postsServ.deletePost(key);
    this.router.navigate(['/posts']);
  }

  ngOnDestroy() {
    this.unSubPosts.unsubscribe();
  }
}
