import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServise } from '../auth.servise';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  boolean = true;

  appForm: FormGroup;

  constructor(
    private authServ: AuthServise,
    private router: Router
  ) {}

  ngOnInit() {
    this.appForm = new FormGroup({
      'user-email': new FormControl(null, [Validators.required, Validators.email]),
      'user-password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onToSingUp(e: Event) {
    e.preventDefault();
    const bul = false;
    this.authServ.showAuthElem.next(bul);
  }

  async onSingIn() {
    const email = this.appForm.value['user-email'];
    const password = this.appForm.value['user-password'];
    const userInfo = await this.authServ.singIn(email, password);
    if (userInfo) {
      this.router.navigate(['/posts']);
    }
  }

}
