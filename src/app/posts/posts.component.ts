import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Post } from './post/post.servise';
import { PostsServise } from './posts.srvise';
import { AuthServise } from '../authentication/auth.servise';
import { Subscription } from 'rxjs';

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
    private authServ: AuthServise
  ) {
    this.posts = [];
  }

  ngOnInit() {
    this.posts = this.postsServ.posts;
    this.unSubInterval = interval(1000).subscribe({
      next: v => {
        console.log('IVENT', v);
      }
    });
    this.authServUnsub = this.authServ.getItemList()
      .pipe(
        map(chenges => chenges.map(c => (
            {key: c.payload.key, ...c.payload.val()}))
        )
      )
      .subscribe({
        next: v => {
          console.log('ITEMS_LIST', v);
        },
        complete: () => {
          console.log('TEE AND');
        }
      });
  }

  onOpenPost() {
    this.authServ.createItems(this.posts);
  }

  onDelitePOst() {

  }

  ngOnDestroy() {

    this.unSubInterval.unsubscribe();
    if (!this.authServUnsub) {
      return;
    }
    this.authServUnsub.unsubscribe();
  }
}
