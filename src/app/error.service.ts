import {
  ErrorHandler,
  Injector,
  Injectable,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ErrorService implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error: any) {
    const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {
    } else {
    }
    router.navigate(['/pop-up']);
  }

}
