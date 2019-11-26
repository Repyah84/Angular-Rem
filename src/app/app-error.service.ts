import {
  ErrorHandler,
  Injector,
  Injectable,
  ComponentFactoryResolver,
  ViewChild,
  ElementRef
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { PopUpService } from './pop-up/pop-up.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppErrorService implements ErrorHandler {

  error;

  constructor(
    private injector: Injector,
  ) {
      this.error = 'lutuuuil.u.u';
    }

  handleError(error: any) {
    const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {
      this.error = error.error.message;
    } else {
      this.error = error;
    }
    console.log('HENDEL_ERROR', this.error);
    router.navigate(['/pop-up']);
  }

}
