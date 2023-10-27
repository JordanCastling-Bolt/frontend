import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsServiceService } from '../posts-service.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {

  constructor(public postsservice: PostsServiceService) { }

  ngOnInit(): void {
  }

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      alert('Invalid!');
      return;
    }
    alert('Post ID: ' + postForm.value.enteredID + ' - Post Name: ' + postForm.value.enteredName + ' - Post Content: ' + postForm.value.enteredContent);

    this.postsservice.addPost_service(postForm.value.enteredID, postForm.value.enteredName, postForm.value.enteredContent);
    postForm.resetForm();
}


}
