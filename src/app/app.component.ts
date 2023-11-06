import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Inject the AuthServiceService
  constructor(public authservice: AuthServiceService, private router: Router) { }  // Note that it's public so the template can access it

  // Define the logout method if you're using it in the template
  async logout() {
    // Call the logout logic here, for example:
    this.authservice.setToken('');  // assuming setToken is async
    this.authservice.clearUser();   // assuming clearUser is async
    // Navigate to login route
    this.router.navigate(['/login']);
  } catch (error: Error) {
    console.error('Error during logout:', error);
  }
}
