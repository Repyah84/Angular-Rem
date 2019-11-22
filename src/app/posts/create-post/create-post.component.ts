import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { InitProduct, CreatePostServise } from './create-post.servise';
import { Post } from '../post/post.servise';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  allCalories;
  loadinSpiner;
  appForm: FormGroup;
  itemsSearch: InitProduct[];
  showFoods: InitProduct[];

  @ViewChild('inNput', { static: false }) input: ElementRef;

  constructor(
    private router: Router,
    private cpServ: CreatePostServise
  ) {
    this.loadinSpiner = false;
    this.allCalories = 0;
    this.itemsSearch = [];
    this.showFoods = [];
  }

  ngOnInit() {
    this.appForm = new FormGroup({
      title: new FormControl(null),
      comment: new FormControl(null)
    });
  }

  onSearch(value: string) {
    if (!value) {
      this.itemsSearch.length = 0;
      return;
    }
    this.loadinSpiner = true;
    this.cpServ.searcheItem(value)
      .subscribe(item => {
        this.itemsSearch = item;
        this.loadinSpiner = false;
      });
  }

  onDeliteItem(index: number) {
    this.showFoods.splice(index, 1);
    this.inAllCalories();
  }

  onAddFood(fodName: string) {
    this.cpServ.getItem(fodName)
      .subscribe(response => {
        this.itemsSearch.length = 0;
        this.input.nativeElement.value = null;
        this.showFoods.push(response);
        this.inAllCalories();
      });
  }

  async onCreatePost() {
    const post: Post = {
      title: this.appForm.value.title,
      comment: this.appForm.value.comment,
      foods: this.showFoods,
      allCalories: this.allCalories,
      date: new Date().toISOString()
    };
    await this.cpServ.createPost(post);
    this.appForm.reset();
    this.router.navigate(['/posts']);
  }

  onMinus(index: number) {
    if (this.showFoods[index].amount === 1) {
      return;
    }
    const amount = this.showFoods[index].amount;
    const calories = this.showFoods[index].calories / amount;
    this.showFoods[index].calories = +(this.showFoods[index].calories - calories).toFixed(2);
    this.showFoods[index].amount--;
    this.allCalories = +(this.allCalories - calories).toFixed(2);
  }

  onPlas(index: number) {
    const amount = this.showFoods[index].amount;
    const calories = this.showFoods[index].calories / amount;
    this.showFoods[index].calories = +(this.showFoods[index].calories + calories).toFixed(2);
    this.showFoods[index].amount++;
    this.allCalories = +(this.allCalories + calories).toFixed(2);
  }

  inAllCalories() {
    this.allCalories = 0;
    this.showFoods.forEach(item => {
      this.allCalories = +(this.allCalories + item.calories).toFixed(2);
    });
  }

}
