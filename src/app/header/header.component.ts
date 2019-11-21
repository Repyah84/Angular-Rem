import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserServise } from '../user/user.servise';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private userServ: UserServise
    ) {}

  async onLogout(event: Event) {
    event.preventDefault();
    await this.userServ.signOut();
    this.router.navigate(['/sing-in']);
  }
}
