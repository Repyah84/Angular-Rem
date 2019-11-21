import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsServise } from '../posts.srvise';
import { Subscription } from 'rxjs';
import { Post } from './post.servise';
import { Router } from '@angular/router';

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
    ) {}

  ngOnInit() {
    this.unSubPosts = this.postsServ.SubInPosts.subscribe(responsePost => {
      this.post = responsePost;
    });

  }

  onDelitePost(key: string) {
    this.postsServ.delitePOst(key);
    this.router.navigate(['/posts']);
  }

  ngOnDestroy() {
    this.unSubPosts.unsubscribe();
  }
}
