// Importing necessary modules and components
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login/login.component";
import { PostDisplayComponent } from "./posts/posts-display/posts-display.component";
import { PostsCreateComponent } from "./posts/posts-create/posts-create.component";

// Defining the routes
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add', component: PostsCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'posts', component: PostDisplayComponent } // Added a new path for posts
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
