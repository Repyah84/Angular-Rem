import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HeaderComponent } from './header/header.component';
import { SingInComponent } from './authentication/sing-in/sing-in.component';
import { SingUpComponent } from './authentication/sing-up/sing-up.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', redirectTo: '/sing-in', pathMatch: 'full'},
  {path: 'header', component: HeaderComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'user', component: UserComponent},
  {path: 'sing-in', component: SingInComponent},
  {path: 'sing-up', component: SingUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
