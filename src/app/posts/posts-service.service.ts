import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';
import { Post } from './models/post.model'; 
import { ErrorService } from '../error/error.service';

@Injectable({ providedIn: 'root' })
export class PostsServiceService {
  // Local state for posts and a Subject to emit updates to subscribers
  private postsDisplay: Post[] = [];
  private updatedPostsDisplay = new Subject<Post[]>();

  constructor(private http: HttpClient, private authService: AuthServiceService, private errorService: ErrorService) { }

  // Helper function to generate HttpHeaders with an authentication token
  getAuthHeaders(): HttpHeaders | null {
    const token = this.authService.getToken();
    if (!token) {
      this.errorService.throwError('Auth Token is not available'); 
      return null; 
    }
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }
  
  // Service method to add a post
  addPost_service(postId: string, postTitle: string, postContent: string, postDepartment: string) {
    const headers = this.getAuthHeaders();
    if (!headers) return; 
    
    const postData = { id: postId, title: postTitle, post: postContent, department: postDepartment };
  
    // HTTP POST request to add a new post
    this.http.post<{ message: string; post: any }>('https://localhost:3000/api/posts', postData, { headers })
      .pipe(catchError(error => {
        console.error('Error adding post:', error);
        return throwError(() => error);
      }))
      .subscribe((response) => {
        this.errorService.clearError();
        this.postsDisplay.push(response.post);
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
  }
  
  // Service method to retrieve posts
  getPost_service() {
    const headers = this.getAuthHeaders();
    if (!headers) return;  
  
    // HTTP GET request to fetch posts
    this.http.get<{ message: string; posts: any[] }>('https://localhost:3000/api/posts', { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching posts:', error);
          return throwError(() => error);
        })
      )
      .subscribe((postResponse) => {
        this.errorService.clearError();
        // Transform the response to match the Post interface
        this.postsDisplay = postResponse.posts.map(post => ({
          _id: post._id,
          id: post._id, 
          title: post.title,
          post: post.post, 
          __v: '', 
          department: post.department 
          
        }));
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
  }
  
  // Service method to delete a post by ID
  deletePost_service(postId: string) {
    const headers = this.getAuthHeaders();
    if (!headers) return;
  
    // Pass headers directly in the second argument of the delete method
    this.http.delete(`https://localhost:3000/api/posts/${postId}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error deleting post:', error);
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.errorService.clearError();
        // Filter out the deleted post from the local posts state
        this.postsDisplay = this.postsDisplay.filter(post => post._id !== postId);
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
  }
  
  // Assuming fetchPosts method is something like this
  fetchPosts() {
    // HTTP GET request to fetch posts, typed with <Post[]>
    this.http.get<Post[]>('https://localhost:3000/api/posts')
      .pipe(
        catchError(error => {
          console.error('Error fetching posts:', error);
          return throwError(() => error);
        })
      )
      .subscribe((posts: Post[]) => {
        this.postsDisplay = posts; // TypeScript now recognizes Post[]
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
  }
  // Returns an observable that subscribers can listen to for updates on posts
  getUpdateListener() {
    return this.updatedPostsDisplay.asObservable();
  }
}
