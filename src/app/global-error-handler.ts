import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';

@Injectable()
export class GlobalErrorHandler  implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorServece = this.injector.get(ErrorService);

    let message;
    if (error instanceof HttpErrorResponse) {
      message = errorServece.getServerErrorMessage(error);
      errorServece.showError(message);
    } else {
      message = errorServece.getClientErrorMessage(error);
      errorServece.showError(message);
    }
    console.error(error);
  }
}
