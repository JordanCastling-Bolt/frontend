import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authservice: AuthServiceService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authToken = this.authservice.getToken();

        // Clone the request and set the new header.
        const authReq = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + authToken)
        });

        return next.handle(authReq);
    }
}
