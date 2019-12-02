import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[refDir]'
})
export class PopUpDirective {
  constructor(public containerRef: ViewContainerRef) { }
}
