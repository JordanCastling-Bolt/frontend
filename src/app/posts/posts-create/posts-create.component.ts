import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsServiceService } from '../posts-service.service';
import { ErrorService } from '../../error/error.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit, OnDestroy {

  private errorSub!: Subscription; // To keep track of the subscription
  public errorMessage!: string;   // To store and display the error message

  constructor(public postsservice: PostsServiceService, private errorService: ErrorService) { }

  ngOnInit(): void {
    // Subscribe to the error messages from the ErrorService
    this.errorSub = this.errorService.error$.subscribe((errorMessage: string | null) => {
      if (errorMessage) {
        this.errorMessage = errorMessage;
        // You can decide here how to display the error. For this example, we're just setting it to a local variable.
      }
    });
  }
  
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      this.errorService.throwError('Invalid!');
      return;
    }
  
    this.postsservice.addPost_service(
      postForm.value.enteredID,
      postForm.value.enteredName,
      postForm.value.enteredContent
    );
    postForm.resetForm();
  }
  

  ngOnDestroy(): void {
    // Unsubscribe from the error messages when the component is destroyed to prevent memory leaks.
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
