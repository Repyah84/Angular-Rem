import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { map } from 'rxjs/operators';

import { Post } from '../post/post.servise';
import { UserServise } from 'src/app/user/user.servise';

export class InitProduct {
  foodName: string;
  imege: string;
  id?: string;
  calories?: number;
  amount?: number;
}

@Injectable({ providedIn: 'root' })
export class CreatePostServise {

  itemRef: AngularFireList<any>;

  constructor(
    private userServ: UserServise,
    private http: HttpClient,
    private db: AngularFireDatabase
  ) {
  }

  searcheItem(value: string) {
    return this.http.get(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${value}`,
      {
        headers: new HttpHeaders({
          'x-app-id': '505ea1f5',
          'x-app-key': 'a8654bc1f5d68ed03f8e3ae59cb6aa25',
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

  getItem(fodName: string) {
    const food = { query: fodName };
    return this.http.post(
      `https://trackapi.nutritionix.com/v2/natural/nutrients`,
      food,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'x-app-id': '505ea1f5',
          'x-app-key': 'a8654bc1f5d68ed03f8e3ae59cb6aa25',
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
    this.itemRef = this.db.list(`posts/${this.userServ.userId}`);
    await this.itemRef.push(post);
  }

}



