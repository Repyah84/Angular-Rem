import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {

  inErrorMessage = new Subject<string>();

  getClientErrorMessage(error: Error): string {
    return  error.message ?
            error.message :
            error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return  navigator.onLine ?
            error.error.message :
            'No Internet Connection';
  }

}
