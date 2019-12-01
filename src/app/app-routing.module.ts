import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: PostsComponent, ...canActivate(redirectUnauthorizedTo(['auth']))},
  {path: 'posts', component: PostsComponent, ...canActivate(redirectUnauthorizedTo(['auth']))},
  {path: 'post', component: PostComponent, ...canActivate(redirectUnauthorizedTo(['auth']))},
  {path: 'create-post', component: CreatePostComponent, ...canActivate(redirectUnauthorizedTo(['auth']))},
  {path: 'user', component: UserComponent, ...canActivate(redirectUnauthorizedTo(['auth']))},
  {path: '**', component: PostsComponent, ...canActivate(redirectUnauthorizedTo(['auth']))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

