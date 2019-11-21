import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthServise } from '../authentication/auth.servise';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authAerv: AuthServise
    ) {}

  async onLogout(event: Event) {
    event.preventDefault();
    await this.authAerv.signOut();
    this.router.navigate(['/sing-in']);
  }
}
