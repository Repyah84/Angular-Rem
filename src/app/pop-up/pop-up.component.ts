import { Component, OnInit, Input } from '@angular/core';
import { PopUpService } from './pop-up.service';
import { AppErrorService } from '../app-error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  errorMessage;
  chouErrorMesage;

  constructor(
    private appErrorSev: AppErrorService,
    private router: Router
    ) {
      this.errorMessage = '';
      this.chouErrorMesage = false;
    }

  ngOnInit() {

  }

  onChouMesage() {
    this.errorMessage = this.appErrorSev.error;
  }


  onClosePop() {
     this.errorMessage = '';
     this.router.navigate(['posts']);
  }

}
