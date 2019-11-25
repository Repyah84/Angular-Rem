import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export class AppErrorService implements ErrorHandler {
  constructor() { }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.log('ERROR', error);
      console.log(error.error.message);
    } else {
      // console.error('an error occurred here broo');
      console.log(error);
    }
  }

}
