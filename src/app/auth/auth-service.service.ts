import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // This service is available in the root injector and can be injected anywhere in the app
})
export class AuthServiceService {

  // Property to store the authentication token
  private token!: string;

  // Property to store the current user's details, it's private to the service
  private _currentUser: { name?: string } = {};

  // Constructor to inject the HttpClient service
  constructor(private http: HttpClient) {
    // On service initialization, check if username is saved in local storage
    const savedName = localStorage.getItem('username');
    // If found, set the current user's name
    if (savedName) {
      this._currentUser.name = savedName;
    }
  }

  // Method for signing up a new user, it's async and will return a promise
  async signup(firstName: string, lastName: string, username: string, userpassword: string) {
    // Prepare the user data
    const authData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: userpassword
    };
    // Make a POST request to the signup endpoint and wait for the response
    const response = await this.http.post<{ token: string, username: string }>(
      'https://localhost:3000/api/users/signup',
      authData
    ).toPromise();
    // Return the response containing the token and username
    return response;
  }

  // Method for logging in a user, similar to the signup method
  async login(username: string, userpassword: string) {
    // Prepare the login data
    const authData = {
      username: username,
      password: userpassword
    };
    // Make a POST request to the login endpoint and wait for the response
    const response = await this.http.post<{ token: string, username: string }>(
      'https://localhost:3000/api/users/login',
      authData
    ).toPromise();
    // Return the response containing the token and username
    return response;
  }

  // Method to save the authentication token to local storage
  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  // Method to retrieve the authentication token from local storage
  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Getter method to access the current user's details
  get currentUser(): { name?: string } {
    return this._currentUser;
  }

  // Method to set the current user's name and save it to local storage
  setUser(name: string): void {
    if (name) {
      this._currentUser.name = name;
      localStorage.setItem('username', name);
    }
  }

  // Method to clear the current user's details from the service and local storage
  clearUser(): void {
    this._currentUser = {};
    localStorage.removeItem('username');
  }

  // Method to log out the user by clearing user details and the token
  logout(): void {
    this.clearUser();
    localStorage.removeItem('auth_token');
  }

  // Method to check if the user is logged in based on the presence of the auth token
  isLoggedIn(): boolean {
    return !!this.getToken(); // The double-bang converts a truthy/falsy value to a boolean true/false
  }

  // Method that wraps the isLoggedIn method for semantic clarity
  checkAuthentication(): boolean {
    return this.isLoggedIn();
  }

}
