import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';

import { ErrorService } from './error.service';
import { PopUpDirective } from './pop-up/pop-up.directive';
import { PopUpComponent } from './pop-up/pop-up.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular-fodd';

  unSubErrorServ: Subscription;
  @ViewChild(PopUpDirective, {static: false}) refDir: PopUpDirective;

  constructor(
    private errorServ: ErrorService,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.unSubErrorServ = this.errorServ.inErrorMessage.subscribe(errorMessage => {
      this.showPopUp(errorMessage);
    });
  }

  showPopUp(errorMessage: string) {
    const modalFactory = this.resolver.resolveComponentFactory(PopUpComponent);
    const component = this.refDir.containerRef.createComponent(modalFactory);

    component.instance.errorMessage = errorMessage;
    component.instance.inClose.subscribe(_ => {
      this.refDir.containerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.unSubErrorServ) {
      this.unSubErrorServ.unsubscribe();
    }
  }
}
