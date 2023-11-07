import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsServiceService } from '../posts-service.service';
import { ErrorService } from '../../error/error.service';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit, OnDestroy {

  // Subscription to handle errors
  private errorSub!: Subscription;
  // Messages to be displayed to the user
  public errorMessage!: string;
  public successMessage!: string;

  // Predefined list of departments
  departments: string[] = [
    'Department of Education',
    'Department of Health',
    'Department of Transport',
    'Department of Finance',
    'Department of Justice',
    'Department of Defence',
    'Department of Labor',
    'Department of Energy',
    'Department of National Security',
    'Department of State'
  ];

  // Injecting required services and ChangeDetectorRef for managing UI updates
  constructor(
    public postsservice: PostsServiceService, 
    private errorService: ErrorService, 
    public authService: AuthServiceService, 
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Check if the user is authenticated on initialization
    if (!this.authService.checkAuthentication()) {
      const errorText = 'You need to be logged in to create a post.';
      // Use ErrorService to handle the authentication error
      this.errorService.throwError(errorText);
      this.errorMessage = errorText;
    }

    // Subscribe to the error service to handle any emitted errors
    this.errorSub = this.errorService.error$.subscribe((errorMessage: string | null) => {
      if (errorMessage) {
        this.errorMessage = errorMessage;
        // Use ChangeDetectorRef to inform Angular to check for changes
        this.cdRef.detectChanges();
      }
    });
  }

  async onAddPost(postForm: NgForm) {
    // Reset success message when adding a new post
    this.successMessage = '';
    if (postForm.invalid) {
      const errorText = 'Invalid form!';
      // Emit an error if the form is invalid
      this.errorService.throwError(errorText);
      this.errorMessage = errorText;
      return;
    }

    // Check if the department is selected
    const postDepartment = postForm.value.enteredDepartment;
    if (!postDepartment) {
      const errorText = 'Department is required.';
      // Emit an error if the department isn't provided
      this.errorService.throwError(errorText);
      this.errorMessage = errorText;
      return;
    }

    // Call the post service to add a new post
    this.postsservice.addPost_service(
      postForm.value.enteredID,
      postForm.value.enteredName,
      postForm.value.enteredContent,
      postDepartment
    );
    // Set success message and reset the form
    this.successMessage = 'Post added successfully!';
    postForm.resetForm();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the error subscription when the component is destroyed
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
