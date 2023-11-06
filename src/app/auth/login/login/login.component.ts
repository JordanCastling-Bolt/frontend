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
  public firstName: string = '';
  public lastName: string = '';


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
            .then((response?: { token: string, username: string }) => {
                if (!response) {
                    throw new Error('Login failed.');
                }
                console.log('Login Response:', response);
                // handle successful login
                this.authservice.setToken(response.token);
                this.authservice.setUser(response.username);
                this.router.navigate(['/posts']);
            })
            .catch((error: any) => {
                // handle login error
                this.formError = 'Login failed. Please try again.';
            });
    } else {
        this.authservice.signup(
            loginForm.value.firstName,
            loginForm.value.lastName,
            loginForm.value.username, 
            loginForm.value.password
        )
            .then((response?: { token: string }) => {
                if (!response) {
                    throw new Error('Signup failed.');
                }
                // handle successful signup, maybe redirect or inform the user
                this.authservice.setToken(response.token);  // Set the token here
                this.router.navigate(['login']);
            })
            .catch((error: any) => {
                // handle signup error, inform the user
                this.formError = 'Signup failed. Please try again.';
            });
    }
}


}
