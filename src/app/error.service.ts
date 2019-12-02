import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ErrorService {

  getIvetn = new Subject<any>();

  constructor(
    private zone: NgZone
  ) { }

  getClientErrorMessage(error: Error): string {
    return error.message ?
           error.message :
           error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?
           error.error.message :
           'No Internet Connection';
  }

  // showError(message: string): void {
  //   this.zone.run(() => {
  //     this.snackBar.open(message, 'X', {panelClass: ['error']});
  //   });
  // }

}
