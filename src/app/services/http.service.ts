import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  get(url: string) {
    return this.httpClient
      .get(url)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(response: any) {
    const error = response.error;
    const message = response.message;
    // call snackbar and show error with message
    return throwError(() => new Error(message));
  }
}
