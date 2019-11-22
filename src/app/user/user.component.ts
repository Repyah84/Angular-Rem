import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from '../../environments/environment';
import { UserServise, User } from './user.servise';
import { Subscription } from 'rxjs';

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
    this.unSubUserInfo = this.userServ.getUserInfo().subscribe({
      next: responseUser => {
        this.userInfo = responseUser;
        console.log('UserUNFORESPONSE', this.userInfo);
      }
    });
    this.appForm = new FormGroup({
      'user-name': new FormControl(null),
      'user-age': new FormControl(null),
      'user-height': new FormControl(null),
      'user-weight': new FormControl(null),
    });
  }

  async initUserInfo() {
    if (this.btnValue === 'Change') {
      this.btnValue = 'Save';
    } else {
      const userInfoUp: User = {
        userName: this.appForm.value['user-name'],
        userAge: this.appForm.value['user-age'],
        userHeight: this.appForm.value['user-height'],
        userWeight: this.appForm.value['user-weight']
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
