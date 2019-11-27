import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from '../../environments/environment';
import { UserServise, User } from './user.servise';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  avatar;
  btnValue;
  userInfo: User;
  appForm: FormGroup;
  unSubUserInfo: Subscription;

  constructor(private userServ: UserServise) {
    this.btnValue = 'Change';
    this.avatar = environment.avatar;
  }

  ngOnInit() {
    this.unSubUserInfo = this.userServ.user$
    .pipe(
      switchMap(user => {
        if (user) {
          return this.userServ.getUserInfo(user.uid);
        }
        return of();
      })
    )
    .subscribe({
      next: responseUser => {
        this.userInfo = responseUser;
      }
    });

    this.appForm = new FormGroup({
      'user-name': new FormControl(null),
      'user-age': new FormControl(null),
      'user-height': new FormControl(null),
      'user-weight': new FormControl(null),
      'select-height': new FormControl('cm'),
      'select-weight': new FormControl('kg')
    });
  }

  async initUserInfo() {
    if (this.btnValue === 'Change') {
      this.btnValue = 'Save';
    } else {
      const userInfoUp: User = {
        userName: this.appForm.value['user-name'],
        userAge: this.appForm.value['user-age'],
        userHeight: `${this.appForm.value['user-height']} ${this.appForm.value['select-height']}`,
        userWeight: `${this.appForm.value['user-weight']} ${this.appForm.value['select-weight']}`
      };
      await this.userServ.updatingUserInfo(userInfoUp);
      this.btnValue = 'Change';
    }
  }

  ngOnDestroy() {
    if (this.unSubUserInfo) {
      this.unSubUserInfo.unsubscribe();
    }
  }

}
