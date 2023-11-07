import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';
import { Router } from '@angular/router';

// The @Component decorator indicates that the following class is an Angular component
// It provides the Angular metadata for the component including the selector, template URL, and styles.
@Component({
  selector: 'app-root',  // The custom HTML tag that will be used for this component.
  templateUrl: './app.component.html',  // The location of the HTML template file for this component.
  styleUrls: ['./app.component.css']  // The location of the CSS styles for this component.
})
export class AppComponent {
  title = 'frontend';  // A property bound to the title in the component's template

  // The constructor is used to inject dependencies into the component
  constructor(public authservice: AuthServiceService, private router: Router) { }  

  // An async method to handle the logout process
  async logout() {
    // Clear the token from the AuthService, effectively logging out the user
    this.authservice.setToken('');  
    // Clear any user information from the AuthService
    this.authservice.clearUser();   
    // Navigate to the '/login' route using Angular's Router service
    this.router.navigate(['/login']);
  // Catch block to handle any errors that may occur during the logout process
  } catch(error: Error) {
    console.error('Error during logout:', error);  // Log the error to the console
  }
}
