import { Injectable } from '@angular/core';

import { InitProduct } from '../create-post/create-post.servise';

export interface Post {
  title: string;
  comment: string;
  key?: string;
  foods?: InitProduct[];
  allCalories?: number;
  date: string;
}

@Injectable({providedIn: 'root'})
export class PostServise {
  constructor() {}
}
