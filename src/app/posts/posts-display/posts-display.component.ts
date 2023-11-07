import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsServiceService } from '../posts-service.service';
import { ErrorService } from '../../error/error.service';
import { Post } from '../models/post.model';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.css']
})
export class PostDisplayComponent implements OnInit, OnDestroy {
  // Local state for posts and filtered posts
  posts: Post[] = [];
  filteredPosts: Post[] = []; 
  errorMessage: string | null = null;
  selectedDepartment: string = '';

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

  // Subscriptions to manage the observables
  private postsSubscription!: Subscription;
  private errorSubscription!: Subscription;

  // Injecting required services
  constructor(
    public postsService: PostsServiceService,
    private errorService: ErrorService,
    public authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    // Requesting posts when the component initializes
    this.postsService.getPost_service();
    // Subscribing to the posts update observable
    this.postsSubscription = this.postsService.getUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.filteredPosts = posts; // Initially, all posts are shown
      });
      
    // Check authentication and handle error if not authenticated
    if (!this.authService.checkAuthentication()) {
      this.handleAuthenticationError();
    }
    
    // Subscribe to the error stream to display any error messages
    this.errorSubscription = this.errorService.error$
      .subscribe((error: string | null) => {
        this.errorMessage = error;
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.postsSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }

  // Method to delete a post by ID
  onDelete(postId: string): void {
    this.postsService.deletePost_service(postId);
  }

  // Sets error if the user is not authenticated
  handleAuthenticationError(): void {
    const errorText = 'You need to be logged in to view posts.';
    this.errorService.throwError(errorText);
    this.errorMessage = errorText;
  }

  // Filters posts by selected department
  filterPostsByDepartment(): void {
    if (this.selectedDepartment) {
      // Apply filter based on selected department
      this.filteredPosts = this.posts.filter(post => post.department === this.selectedDepartment);
    } else {
      // If no department is selected, show all posts
      this.filteredPosts = [...this.posts]; 
    }
  }
}
