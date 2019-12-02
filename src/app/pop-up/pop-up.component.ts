import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {

  @Input() errorMessage;
  @Output() inClose = new EventEmitter<any>();

  constructor() {
    this.errorMessage = '';
  }

}
