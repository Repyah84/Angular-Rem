import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  @Input() error;
  @Output() getValue = new EventEmitter<any>();

  constructor() {
    this.error = '';
  }

  ngOnInit() {
  }

  onClousePopUp() {
    const bul = false;
    this.getValue.emit(bul);
  }
}
