import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class ErrorService {

  constructor(
    public snackBar: MatSnackBar,
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

  showError(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', {panelClass: ['error']});
    });
  }

}
