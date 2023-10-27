import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // Import this

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token!: string;

  constructor(private http: HttpClient) { }

  signup(username: string, userpassword: string) {
    const authData = {
      username: username,
      password: userpassword
    };
    return this.http.post<{ token: string }>('https://localhost:3000/api/users/signup', authData);
}

login(username: string, userpassword: string) {
    const authData = {
      username: username,
      password: userpassword
    };
    return this.http.post<{ token: string }>('https://localhost:3000/api/users/login', authData);
}

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
