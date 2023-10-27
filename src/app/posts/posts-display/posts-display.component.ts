import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsServiceService } from '../posts-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.css']
})
export class PostDisplayComponent implements OnInit, OnDestroy {

  posts: { _id: string, id: string, name: string, _v: string }[] = [];
  
  constructor(public postsService: PostsServiceService) { }

  private postsSubscription!: Subscription;

  ngOnInit(): void {
    this.postsService.getPost_service();
    this.postsSubscription = this.postsService.getUpdateListener()
      .subscribe((posts: { _id: string, id: string, name: string, _v: string }[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
  

  onDelete(postId: string): void {
    this.postsService.deletePost_service(postId);
  }

}
