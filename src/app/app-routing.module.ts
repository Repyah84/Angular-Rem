import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SingInComponent } from './authentication/sing-in/sing-in.component';
import { SingUpComponent } from './authentication/sing-up/sing-up.component';
import { UserComponent } from './user/user.component';
import { PopUpComponent } from './pop-up/pop-up.component';

const routes: Routes = [
  {path: 'pop-up', component: PopUpComponent},
  {path: 'sing-in', component: SingInComponent},
  {path: 'sing-up', component: SingUpComponent},
  {path: '', component: PostsComponent, ...canActivate(redirectUnauthorizedTo(['sing-in']))},
  {path: 'posts', component: PostsComponent, ...canActivate(redirectUnauthorizedTo(['sing-in']))},
  {path: 'post', component: PostComponent, ...canActivate(redirectUnauthorizedTo(['sing-in']))},
  {path: 'create-post', component: CreatePostComponent, ...canActivate(redirectUnauthorizedTo(['sing-in']))},
  {path: 'user', component: UserComponent, ...canActivate(redirectUnauthorizedTo(['sing-in']))},
  {path: '**', component: PostsComponent, ...canActivate(redirectUnauthorizedTo(['sing-in']))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

