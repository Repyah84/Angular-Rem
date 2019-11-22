import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthServise } from '../auth.servise';
import { UserServise, User } from '../../user/user.servise';
import { Router } from '@angular/router';

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
    if (this.valueBtn === 'up') {
      const user: User = {
        userEmail: userInfo.email,
        userName: this.valueForm.value['user-name'],
        userAge: this.valueForm.value['user-age'],
        userHeight: this.valueForm.value['user-height'],
        userWeight: this.valueForm.value['user-weight'],
      };
      await this.userServ.initUserInfo(user, userInfo.uid);
    }
    this.router.navigate(['/posts']);
    this.valueForm.reset();
  }

  async onAuthGoogle() {
    this.btnDisabled = true;
    const userInfo = await this.authServ.googleAuth();
    this.authWithSocial(userInfo);
    this.btnDisabled = false;
  }

  async onAuthFasebook() {
    this.btnDisabled = true;
    const userInfo = await this.authServ.fasebookAuth();
    this.authWithSocial(userInfo);
    this.btnDisabled = false;
  }

}
