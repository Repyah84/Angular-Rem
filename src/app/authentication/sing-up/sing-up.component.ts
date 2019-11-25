import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserServise, User } from '../../user/user.servise';
import { AuthServise } from '../auth.servise';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  appForm: FormGroup;

  constructor(
    private authServ: AuthServise,
    private userServ: UserServise,
    private router: Router
  ) { }

  ngOnInit() {
    this.appForm = new FormGroup({
      'user-email': new FormControl(null, [Validators.required, Validators.email]),
      'user-password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'user-name': new FormControl(null),
      'user-age': new FormControl(null),
      'user-units': new FormControl('metric'),
      'user-height': new FormControl(null),
      'user-weight': new FormControl(null),
    });
  }

  async onSingUp() {
    const email = this.appForm.value['user-email'];
    const password = this.appForm.value['user-password'];
    const userInfo = await this.authServ.singUp(email, password);
    if (userInfo) {
      const user: User = {
        userEmail: userInfo.email,
        userName: this.appForm.value['user-name'],
        userAge: this.appForm.value['user-age'],
        userHeight: `${this.appForm.value['user-height']}  ${this.appForm.value['user-units'] === 'metric' ? 'cm' : 'ft'}`,
        userWeight: `${this.appForm.value['user-weight']}  ${this.appForm.value['user-units'] === 'metric' ? 'kg' : 'lb'}`,
      };
      await this.userServ.initUserInfo(user);
      this.router.navigate(['/posts']);
    }
  }
}
