import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // Inject MatDialog to be able to open dialogs and ErrorService to handle error state
  constructor(private dialog: MatDialog, private errorService: ErrorService) {}

  // This method is required by HttpInterceptor interface. It intercepts all HTTP requests.
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = "An Unknown Error has occured";
          // Check if the error object has a message property and use it if available
          if (error.error.message) {
            errorMessage = error.error.message;
          }
          // Open an error dialog and pass the error message to be displayed
          this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
          // Rethrow the error so that other error handlers can catch it
          return throwError(error);
        })
      );
  }
}
