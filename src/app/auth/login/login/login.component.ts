import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public option: string;
  public username: string = '';
  public password: string = '';
  public formError: string | null = '';

  constructor(private authservice: AuthServiceService, private router: Router) {
    this.option = this.router.url;
  }

  ngOnInit(): void { }

  onLogin(loginForm: NgForm): void {
    if (loginForm.invalid) {
      this.formError = "Please ensure the form is filled out correctly.";
      return;
    }

    this.formError = null;
    if (this.option === '/login') {
      this.authservice.login(loginForm.value.username, loginForm.value.password)
        .subscribe({
          next: (response: { token: string }) => {
            // handle successful login
            this.authservice.setToken(response.token);  // Set the token here
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            // handle login error
            this.formError = 'Login failed. Please try again.';
          }
        });
    } else {
      this.authservice.signup(loginForm.value.username, loginForm.value.password)
        .subscribe({
          next: (response: { token: string }) => {
            // handle successful signup, maybe redirect or inform the user
            this.authservice.setToken(response.token);  // Set the token here
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            // handle signup error, inform the user
            this.formError = 'Signup failed. Please try again.';
          }
        });
    }
}
}
