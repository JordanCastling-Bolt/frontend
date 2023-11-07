import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-login', // Defines the custom HTML tag for this component
  templateUrl: './login.component.html', // Points to the HTML template for this component
  styleUrls: ['./login.component.css'] // Points to the CSS styles for this component
})
export class LoginComponent implements OnInit {

  // Properties to hold the necessary data for login or signup
  public option: string; // To determine the mode (login or signup)
  public username: string = ''; // To store the username entered by the user
  public password: string = ''; // To store the password entered by the user
  public formError: string | null = ''; // To store form error messages
  public firstName: string = ''; // To store the first name for signup
  public lastName: string = ''; // To store the last name for signup

  // Constructor injects the AuthService and Router services
  constructor(private authservice: AuthServiceService, private router: Router) {
    // Determines the mode based on the current route URL
    this.option = this.router.url;
  }

  // Lifecycle hook that is called after Angular has initialized all data-bound properties
  ngOnInit(): void { }

  // Method to handle login or signup submission
  onLogin(loginForm: NgForm): void {
    // Check if the form is invalid and return an error message if it is
    if (loginForm.invalid) {
        this.formError = "Please ensure the form is filled out correctly.";
        return;
    }

    // Reset the form error before attempting to log in or sign up
    this.formError = null;
    // Check if the current option is login
    if (this.option === '/login') {
        // Call the login method from the auth service with the username and password
        this.authservice.login(loginForm.value.username, loginForm.value.password)
            .then((response?: { token: string, username: string }) => {
                // If there is no response, throw an error
                if (!response) {
                    throw new Error('Login failed.');
                }
                // If login is successful, set the token and username, then navigate to the posts page
                this.authservice.setToken(response.token);
                this.authservice.setUser(response.username);
                this.router.navigate(['/posts']);
            })
            .catch((error: any) => {
                // If there is an error during login, set the form error
                this.formError = 'Login failed. Please try again.';
            });
    } else {
        // If the option is not login, assume it is signup and call the signup method
        this.authservice.signup(
            loginForm.value.firstName,
            loginForm.value.lastName,
            loginForm.value.username, 
            loginForm.value.password
        )
            .then((response?: { token: string }) => {
                // If there is no response, throw an error
                if (!response) {
                    throw new Error('Signup failed.');
                }
                // If signup is successful, set the token and navigate to the login page
                this.authservice.setToken(response.token);
                this.router.navigate(['login']);
            })
            .catch((error: any) => {
                // If there is an error during signup, set the form error
                this.formError = 'Signup failed. Please try again.';
            });
    }
  }

  // Other methods for the LoginComponent would go here...

}
