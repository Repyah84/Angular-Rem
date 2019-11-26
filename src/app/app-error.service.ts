import { ErrorHandler, Injector, Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { PopUpService } from './pop-up/pop-up.service';

@Injectable({providedIn: 'root'})
export class AppErrorService implements ErrorHandler {

  error;

  constructor(
    // private injector: Injector,
    // private ingectorPopServ: Injector
    // private popServ: PopUpService
    // private router: Router,
    // private popServ: PopUpService
    // private rsolver: ComponentFactoryResolver
    ) {
      this.error = '';
    }

  handleError(error: any) {
    // const router = this.injector.get(Router);
    // const popServ = this.injector.get(PopUpService);
    if (error instanceof HttpErrorResponse) {
      console.log('ERROR', error);
      console.log(error.error.message);
      this.getError(error.error.message);
    } else {
      // console.error('an error occurred here broo');
      // console.log('Something went wrong try please again');
      this.getError(error);
    }
  }

  getError(error: string) {
    this.error = error;
    console.log('HENDEL_ERROR', this.error);
  }

}
