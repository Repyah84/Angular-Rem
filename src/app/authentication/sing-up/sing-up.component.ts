import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SingUpServise } from './sing-up.servise';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  appForm: FormGroup;

  constructor(
    private singUpServ: SingUpServise,
    private router: Router
  ) { }

  ngOnInit() {
    this.appForm = new FormGroup({
      'user-email': new FormControl(null, [Validators.required, Validators.email]),
      'user-password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'user-name': new FormControl(null),
      'user-age': new FormControl(null),
      'user-height': new FormControl(null),
      'user-weight': new FormControl(null)
    });
  }

  async onSingUp() {
    console.log('THIS_FORM', this.appForm);
    const email = this.appForm.value['user-email'];
    const password = this.appForm.value['user-password'];
    const userInfo = await this.singUpServ.singUp(email, password);
    if (userInfo) {
      console.log('USER_INFO', userInfo);
      this.router.navigate(['/posts']);
    }
  }
}
