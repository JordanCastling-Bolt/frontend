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

  private errorSub!: Subscription; // To keep track of the subscription
  public errorMessage!: string;   // To store and display the error message
  public successMessage!: string;

  constructor(public postsservice: PostsServiceService, private errorService: ErrorService,  public authService: AuthServiceService, private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.authService.checkAuthentication()) { 
      const errorText = 'You need to be logged in to create a post.';
      this.errorService.throwError(errorText);
      this.errorMessage = errorText; 
    }
    this.errorSub = this.errorService.error$.subscribe((errorMessage: string | null) => {
      console.log('Error received:', errorMessage); // Debug line
      if (errorMessage) {
        this.errorMessage = errorMessage;
        this.cdRef.detectChanges(); // Trigger change detection manually

      }
    });
  }
  
  async onAddPost(postForm: NgForm) {
    this.successMessage = '';
    if (postForm.invalid) {
      const errorText = 'Invalid!';
      this.errorService.throwError(errorText);
      this.errorMessage = errorText; 
      return;
    }
  
    this.postsservice.addPost_service(
      postForm.value.enteredID,
      postForm.value.enteredName,
      postForm.value.enteredContent
    );
    this.successMessage = 'Post added successfully!';
    postForm.resetForm();
  }
  

  ngOnDestroy(): void {
    // Unsubscribe from the error messages when the component is destroyed to prevent memory leaks.
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
