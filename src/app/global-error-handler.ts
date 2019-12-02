

import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as Sentry from '@sentry/browser';

import { ErrorService } from './error.service';
import { environment } from '../environments/environment';

Sentry.init({
  dsn: `${environment.senrty}`
});


@Injectable()
export class GlobalErrorHandler  implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error: any) {
    let message;
    const errorServece = this.injector.get(ErrorService);

    Sentry.captureException(error.originalError || error);

    if (error instanceof HttpErrorResponse) {
      message = errorServece.getServerErrorMessage(error);
      errorServece.getIvetn.next(message);
      // errorServece.showError(message);
    } else {
      message = errorServece.getClientErrorMessage(error);
      errorServece.getIvetn.next(message);
      // errorServece.showError(message);
    }
    console.error(error);
  }
}
