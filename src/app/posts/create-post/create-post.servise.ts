import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { map } from 'rxjs/operators';

import { Post } from '../post/post.servise';
import { Observable } from 'rxjs';
import { AuthServise } from 'src/app/authentication/auth.servise';

export class InitProduct {
  foodName: string;
  imege: string;
  id?: string;
  calories?: number;
  amount?: number;
}

@Injectable({ providedIn: 'root' })
export class CreatePostServise {

  userId;

  itemRef: AngularFireList<any>;
  items: Observable<any>;

  constructor(
    private authServ: AuthServise,
    private http: HttpClient,
    private db: AngularFireDatabase
  ) {
    this.userId = this.authServ.userId;
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
            // tslint:disable-next-line:no-shadowed-variable
            responseFoods[key].map(responseFoods => {
              foodsArrey.push(
                {
                  foodName: responseFoods.food_name,
                  imege: responseFoods.photo.thumb,
                  id: responseFoods.tag_id
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
          'x-app-id': '505ea1f5',
          'x-app-key': 'a8654bc1f5d68ed03f8e3ae59cb6aa25',
        })
      }
    ).pipe(
      map(rsponseFood => {
        // tslint:disable-next-line:no-shadowed-variable
        let food: InitProduct;
        for (const key in rsponseFood) {
          if (key === 'foods') {
            rsponseFood[key].map(responseFood => {
              food = {
                foodName: responseFood.food_name,
                imege: responseFood.photo.thumb,
                calories: +responseFood.nf_calories,
                amount: 1
              };
            });
            return food;
          }
        }
      })
    );
  }

  async createPost(post: Post) {
    this.itemRef = this.db.list(`posts/${this.userId}`);
    console.log('SEND_POST', post);
    await this.itemRef.push(post);
  }

}
