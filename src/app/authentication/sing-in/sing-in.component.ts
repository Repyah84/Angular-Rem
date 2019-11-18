import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SingInServise } from './sing-in.servise';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  appForm: FormGroup;

  constructor(
    private singInServ: SingInServise,
    private router: Router
  ) {}

  ngOnInit() {
    this.appForm = new FormGroup({
      'user-email': new FormControl(null, [Validators.required, Validators.email]),
      'user-password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  async onSingIn() {
    const email = this.appForm.value['user-email'];
    const password = `${this.appForm.valid['user-password']}`;
    const userInfo = await this.singInServ.singIn(email, password);
    console.log('USER_INFO', userInfo);
    this.router.navigate(['/posts']);
  }

}
