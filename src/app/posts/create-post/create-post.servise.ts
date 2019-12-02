import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../post/post.servise';
import { UserServise } from '../../user/user.servise';
import { environment } from '../../../environments/environment';

export class InitProduct {
  foodName: string;
  imege: string;
  id?: string;
  calories?: number;
  amount?: number;
}

@Injectable({ providedIn: 'root' })
export class CreatePostServise {

  constructor(
    private userServ: UserServise,
    private http: HttpClient,
    private db: AngularFireDatabase
  ) {
  }

  searcheItem(value: string): Observable<any> {
    return this.http.get(
      `${environment.nutritionix.URL}/search/instant?query=${value}`,
      {
        headers: new HttpHeaders({
          'x-app-id': `${environment.nutritionix.id}`,
          'x-app-key': `${environment.nutritionix.key}`,
        })
      }
    ).pipe(
      map(responseFoods => {
        const foodsArrey: InitProduct[] = [];
        for (const key in responseFoods) {
          if (key === 'common') {
            responseFoods[key].map(foods => {
              foodsArrey.push(
                {
                  foodName: foods.food_name,
                  imege: foods.photo.thumb,
                  id: foods.tag_id
                }
              );
            });
            return foodsArrey;
          }
        }
      })
    );
  }

  getItem(fodName: string): Observable<any> {
    const food = { query: fodName };
    return this.http.post(
      `${environment.nutritionix.URL}/natural/nutrients`,
      food,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-app-id': `${environment.nutritionix.id}`,
          'x-app-key': `${environment.nutritionix.key}`,
        })
      }
    ).pipe(
      map(rsponseFood => {
        let initFood: InitProduct;
        for (const key in rsponseFood) {
          if (key === 'foods') {
            rsponseFood[key].map(responseFood => {
              initFood = {
                foodName: responseFood.food_name,
                imege: responseFood.photo.thumb,
                calories: +responseFood.nf_calories,
                amount: 1
              };
            });
            return initFood;
          }
        }
      })
    );
  }

  async createPost(post: Post) {
    await this.db.list(`posts/${this.userServ.userId}`).push(post);
  }

}



