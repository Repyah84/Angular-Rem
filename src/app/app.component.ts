import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorService } from './error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Angular-fodd';
  showModal;
  errorMesege;

  unSuberrorServ: Subscription;

  constructor(private errorServ: ErrorService) {
    this.showModal = false;
    this.errorMesege = '';
  }

  ngOnInit() {
    this.unSuberrorServ = this.errorServ.getIvetn.subscribe({
      next: event => {
        this.showModal = true;
        this.errorMesege = event;
      }
    });
  }

  handelChangeShwmodal(e: Event) {
    this.showModal = e;
  }

  ngOnDestroy() {
    if (this.unSuberrorServ) {
      this.unSuberrorServ.unsubscribe();
    }
  }

}
