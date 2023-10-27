import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostDisplayComponent } from './posts/posts-display/posts-display.component';
import { AuthInterceptor } from './auth/auth-service.interceptor';
import { LoginComponent } from './auth/login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './error/errorinterceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostsCreateComponent,
    PostDisplayComponent,
    LoginComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
