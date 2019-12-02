import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as Sentry from '@sentry/browser';

import { ErrorService } from './error.service';
import { environment } from '../environments/environment';

Sentry.init({
  dsn: `${environment.senrty}`
});

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any) {
    let message;
    const errorServ = this.injector.get(ErrorService);

    Sentry.captureException(error.originalError || error);

    if (error instanceof HttpErrorResponse) {
      message = errorServ.getServerErrorMessage(error);
      errorServ.inErrorMessage.next(message);
    } else {
      message = errorServ.getClientErrorMessage(error);
      errorServ.inErrorMessage.next(message);
    }
    console.error(error);
  }
}
