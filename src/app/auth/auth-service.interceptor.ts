import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // Constructor to inject the AuthService
    constructor(private authservice: AuthServiceService) {}

    // This method will be called for all http requests
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Retrieve the auth token from the AuthService
        const authToken = this.authservice.getToken();

        // Clone the incoming request and add the Authorization header with the Bearer token
        const authReq = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + authToken)
        });

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(authReq);
    }
}
