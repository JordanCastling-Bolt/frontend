import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';
import { Post } from './models/post.model'; // import your Post model
import { ErrorService } from '../error/error.service';

@Injectable({ providedIn: 'root' })
export class PostsServiceService {

  private postsDisplay: Post[] = [];
  private updatedPostsDisplay = new Subject<Post[]>();

  constructor(private http: HttpClient, private authService: AuthServiceService, private errorService: ErrorService) { }

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
  
  addPost_service(postId: string, postTitle: string, postContent: string) {
    const headers = this.getAuthHeaders();
    if (!headers) return; 
    
    const postData = { id: postId, title: postTitle, post: postContent };
  
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
  
  getPost_service() {
    const headers = this.getAuthHeaders();
    if (!headers) return;  
    
    this.http.get<{ message: string; posts: any }>('https://localhost:3000/api/posts', { headers })
      .pipe(catchError(error => {
        console.error('Error fetching posts:', error);
        return throwError(() => error);
      }))
      .subscribe((postResponse) => {
        this.errorService.clearError();
        this.postsDisplay = postResponse.posts;
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
  }
  
  deletePost_service(postId: string) {
    const headers = this.getAuthHeaders();
    if (!headers) return;  
    
    const httpOptions = {
      headers: headers,
      body: { id: postId }
    };
  
    this.http.delete('https://localhost:3000/api/posts', httpOptions)
      .pipe(catchError(error => {
        console.error('Error deleting post:', error);
        return throwError(() => error);
      }))
      .subscribe(() => {
        this.errorService.clearError();
        const updatedPostsDeleted = this.postsDisplay.filter(post => post._id !== postId);
        this.postsDisplay = updatedPostsDeleted;
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
  }
  
  getUpdateListener() {
    return this.updatedPostsDisplay.asObservable();
  }
}
