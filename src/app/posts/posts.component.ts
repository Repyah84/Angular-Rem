import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Post } from './post/post.servise';
import { PostsServise } from './posts.srvise';
import { UserServise } from '../user/user.servise';

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
    private userServ: UserServise,
    private router: Router
  ) {
    this.posts = [];
    this.showLoad = true;
  }

  ngOnInit() {
    this.authServUnsub = this.userServ.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.postsServ.getPosts(user.uid);
          }
          return of();
        })
      )
      .subscribe({
        next: responsePosts => {
          console.log('ITEMS_LIST', responsePosts);
          this.posts = responsePosts;
          this.showLoad = false;
        },
        complete: () => {
          console.log('COMPLITE');
        }
      });
  }

  onOpenPost(key: string) {
    this.postsServ.SubInPosts.next(this.posts.find(post => post.key === key));
    this.router.navigate(['/post']);
  }

  onDelitePost(key: string) {
    this.postsServ.delitePost(key);
    this.posts.filter(post => post.key !== key);
  }

  ngOnDestroy() {
    if (this.authServUnsub) {
      this.authServUnsub.unsubscribe();
    }
  }
}
