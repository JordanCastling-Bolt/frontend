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

  constructor(private dialog: MatDialog, private errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An Unknown Error has occured ";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        return throwError(error);
      })
    );
  }
}
