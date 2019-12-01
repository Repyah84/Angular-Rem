import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  errorMessage;
  chouErrorMesage;

  constructor(private router: Router) {
      this.errorMessage = '';
      this.chouErrorMesage = false;
    }

  ngOnInit() {

  }

  onClosePop() {
     this.errorMessage = '';
     this.router.navigate(['posts']);
  }

}
