import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style, keyframes } from '@angular/animations';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthServise } from './auth.servise';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('sinIn', [
      transition(':leave', [
        animate('0.4s', style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }))
      ]),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.4s', keyframes([
          style({
            transform: 'translateX(-50%)',
            offset: 0.5
          }),
          style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 1
          })
        ]))
      ])
    ])
  ]
})
export class AuthComponent implements OnInit, OnDestroy {

  showElem;
  unSubshowElem: Subscription;

  constructor(private authServ: AuthServise) {
    this.showElem = true;
  }

  ngOnInit() {
    this.unSubshowElem = this.authServ.showAuthElem.pipe(tap(e => {
      console.log('Log', e);
    })).subscribe(responseBoolean => {
      this.showElem = responseBoolean;
    });
  }

  ngOnDestroy() {
    if (this.unSubshowElem) {
      this.unSubshowElem.unsubscribe();
    }
  }

}
