import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDisplayComponent } from './posts-display.component';

describe('PostsDisplayComponent', () => {
  let component: PostDisplayComponent;
  let fixture: ComponentFixture<PostDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostDisplayComponent]
    });
    fixture = TestBed.createComponent(PostDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
