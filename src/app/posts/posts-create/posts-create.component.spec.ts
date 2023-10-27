import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCreateComponent } from './posts-create.component';

describe('PostsCreateComponent', () => {
  let component: PostsCreateComponent;
  let fixture: ComponentFixture<PostsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsCreateComponent]
    });
    fixture = TestBed.createComponent(PostsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
