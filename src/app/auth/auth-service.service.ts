import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token!: string;
  private _currentUser: { name?: string } = {};

  constructor(private http: HttpClient) {
    const savedName = localStorage.getItem('username');
    if (savedName) {
      this._currentUser.name = savedName;
    }
  }

  async signup(firstName: string, lastName: string, username: string, userpassword: string) {
    const authData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: userpassword
    };
    const response = await this.http.post<{ token: string, username: string }>('https://localhost:3000/api/users/signup', authData).toPromise();
    return response;
  }

  async login(username: string, userpassword: string) {
    const authData = {
      username: username,
      password: userpassword
    };
    const response = await this.http.post<{ token: string, username: string }>('https://localhost:3000/api/users/login', authData).toPromise();
    return response;
  }

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  get currentUser(): { name?: string } {
    return this._currentUser;
  }

  setUser(name: string): void {
    if (name) { // Ensure the name isn't undefined
      this._currentUser.name = name;
      localStorage.setItem('username', name);
    }
  }

  clearUser(): void {
    this._currentUser = {};
    localStorage.removeItem('username');
  }

  logout(): void {
    this.clearUser();
    localStorage.removeItem('auth_token');
  }
}
