import { Component, OnInit, Input } from '@angular/core';
import { PopUpService } from './pop-up.service';
import { AppErrorService } from '../app-error.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  errorMessage;

  constructor(private appErrorServ: AppErrorService) {
    this.errorMessage = this.appErrorServ.error;
  }

  ngOnInit() {
    // this.shouPopUp = true;
  }

  // onShowMessage() {
  //   return this.popServ.iniiErrorMessage();
  // }

  onClosePop() {
    this.errorMessage = '';
  }

}
