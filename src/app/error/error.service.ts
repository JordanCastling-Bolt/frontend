import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This service is provided in the root of the app, making it a singleton
})
export class ErrorService {
  // A BehaviorSubject to hold the current error message. It needs an initial value, null in this case.
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Expose the current error message as an Observable for other parts of the app to subscribe to
  public error$ = this.errorSubject.asObservable();

  // Function to set the error message which will notify all subscribers
  async throwError(errorMessage: string): Promise<void> {
    return new Promise((resolve) => {
      this.errorSubject.next(errorMessage); // Emit the error message to subscribers
      resolve(); // Resolve the promise once the error has been set
    });
  }

  // Function to clear any error message which will notify all subscribers
  async clearError(): Promise<void> {
    return new Promise((resolve) => {
      this.errorSubject.next(null); // Emit null to subscribers indicating there is no error
      resolve(); // Resolve the promise once the error has been cleared
    });
  }
}
