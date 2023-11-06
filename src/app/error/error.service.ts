import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);

  // This is the public observable that other parts of the app can subscribe to
  public error$ = this.errorSubject.asObservable();

  // Emit a new error message
  async throwError(errorMessage: string): Promise<void> {
    return new Promise((resolve) => {
      this.errorSubject.next(errorMessage);
      resolve();
    });
  }

  // Clear the error message
  async clearError(): Promise<void> {
    return new Promise((resolve) => {
      this.errorSubject.next(null);
      resolve();
    });
  }
}
