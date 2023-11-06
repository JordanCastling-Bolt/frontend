import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsServiceService } from '../posts-service.service';
import { ErrorService } from '../../error/error.service'; // Import the ErrorService
import { Post } from '../models/post.model';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.css']
})
export class PostDisplayComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  errorMessage: string | null = null; // To store and display the error message

  constructor(public postsService: PostsServiceService, private errorService: ErrorService, public authService: AuthServiceService) { } // Inject the ErrorService

  private postsSubscription!: Subscription;
  private errorSubscription!: Subscription; // To keep track of the error subscription

  ngOnInit(): void {
    
    this.postsService.getPost_service();
    this.postsSubscription = this.postsService.getUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
      if (!this.authService.checkAuthentication()) { 
        const errorText = 'You need to be logged in to view posts.';
        this.errorService.throwError(errorText);
        this.errorMessage = errorText; 
      }
      // Subscribe to the error messages from the ErrorService
    this.errorSubscription = this.errorService.error$
    .subscribe((error: string | null) => {
      this.errorMessage = error;
      // You can decide here how to display the error. For this example, we're just setting it to a local variable.
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.errorSubscription) { // Unsubscribe from the error observable
      this.errorSubscription.unsubscribe();
    }
  }

  onDelete(postId: string): void {
    this.postsService.deletePost_service(postId);
  }

}
