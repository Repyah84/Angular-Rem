import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServise } from '../auth.servise';
import { UserServise, User } from '../../user/user.servise';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnInit {

  btnDisabled;
  @Input() valueBtn: string;
  @Input() valueForm: FormGroup;

  constructor(
    private authServ: AuthServise,
    private userServ: UserServise,
    private router: Router
  ) {
    this.valueBtn = '';
    this.btnDisabled = false;
  }

  ngOnInit() {

  }

  async authWithSocial(userInfo) {
    const crUserInfo = await this.userServ.checkUserInfo(userInfo.uid);
    if (this.valueBtn === 'up' && !crUserInfo.length) {
      const user: User = {
        userEmail: userInfo.email,
        userName: this.valueForm.value['user-name'],
        userAge: this.valueForm.value['user-age'],
        userHeight: this.valueForm.value['user-height'],
        userWeight: this.valueForm.value['user-weight'],
      };
      await this.userServ.initUserInfo(user, userInfo.uid);
    }
    if (this.valueBtn === 'in' && !crUserInfo.length) {
      const user: User = {
        userEmail: userInfo.email,
      };
      await this.userServ.initUserInfo(user, userInfo.uid);
    }
    this.router.navigate(['/posts']);
  }

  async onAuthGoogle() {
    this.btnDisabled = true;
    const userInfo = await this.authServ.googleAuth();
    await this.authWithSocial(userInfo);
    this.btnDisabled = false;
  }

  async onAuthFasebook() {
    this.btnDisabled = true;
    const userInfo = await this.authServ.fasebookAuth();
    await this.authWithSocial(userInfo);
    this.btnDisabled = false;
  }

}
