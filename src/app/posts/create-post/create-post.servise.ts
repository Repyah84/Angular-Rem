import { Injectable } from '@angular/core';

export class InitProduct {
  foodName: string;
  imege: string;
  id?: string;
  calories?: number;
  amount?: number;
}

@Injectable({providedIn: 'root'})
export class CreatePostServise {
  constructor() {}
}
