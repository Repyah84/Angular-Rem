import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SingInComponent } from './authentication/sing-in/sing-in.component';
import { SingUpComponent } from './authentication/sing-up/sing-up.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UserComponent } from './user/user.component';
import { environment } from '../environments/environment';
import { SocialAuthComponent } from './authentication/social-auth/social-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingInComponent,
    SingUpComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    UserComponent,
    SocialAuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.fierbase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
