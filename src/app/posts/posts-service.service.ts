import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({ providedIn: 'root' })
export class PostsServiceService {

  private postsDisplay: { _id: string; id: string; name: string; _v: string }[] = [];
  private updatedPostsDisplay = new Subject<{ _id: string; id: string; name: string; _v: string }[]>();

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token is not available');
    }
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }

  addPost_service(postId: string, postTitle: string, postContent: string) {
    const headers = this.getAuthHeaders();
    const postData = { id: postId, title: postTitle, post: postContent };
    
    this.http.post<{ message: string; post: any }>('https://localhost:3000/api/posts', postData, { headers: headers })
      .pipe(catchError(error => {
        console.error('Error adding post:', error);
        return throwError(() => error);
      }))
      .subscribe((response) => {
        this.postsDisplay.push(response.post);
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
  }

  getPost_service() {
    const headers = this.getAuthHeaders();
    this.http.get<{ message: string; posts: any }>('https://localhost:3000/api/posts', { headers: headers })
      .pipe(catchError(error => {
        console.error('Error fetching posts:', error);
        return throwError(() => error);
      }))
      .subscribe((postResponse) => {
        this.postsDisplay = postResponse.posts;
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
  }

  deletePost_service(postId: string) {
    const headers = this.getAuthHeaders();
    

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
        const updatedPostsDeleted = this.postsDisplay.filter(post => post._id !== postId);
        this.postsDisplay = updatedPostsDeleted;
        this.updatedPostsDisplay.next([...this.postsDisplay]);
      });
}


  getUpdateListener() {
    return this.updatedPostsDisplay.asObservable();
  }
}
