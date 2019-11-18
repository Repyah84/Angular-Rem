import { Component, OnInit } from '@angular/core';
import { Post } from './post/post.servise';
import { PostsServise } from './posts.srvise';
import { AuthServise } from '../authentication/auth.servise';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(
    private postsServ: PostsServise,
    private authServ: AuthServise
  ) {
    this.posts = [];
  }

  ngOnInit() {
    this.posts = this.postsServ.posts;
  }

  onOpenPost() {
    this.authServ.user$.subscribe({
      next: v => {
        console.log('VVVVVV', v);
      }
    });
  }

  onDelitePOst() {

  }
}
