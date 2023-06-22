import { Component, Input, OnInit } from '@angular/core';
import { CardType } from 'src/app/enums/card-type';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() language: any;
  @Input() data: any;
  @Input() promotion!: boolean;
  @Input() type!: string;
  @Input() badge!: string;
  @Input() categories!: any;
  public categoryName: any;

  constructor(private service: CallApiService) {}

  ngOnInit(): void {
    if (this.badge === 'category') {
      this.convertCategoryToRealName();
    }
  }

  getCardTypePlace() {
    return CardType.place;
  }

  convertCategoryToRealName() {
    if (this.data.category) {
      let item = [];
      let categories = [];
      if (typeof this.data.category === 'string') {
        categories = this.data.category.split(',');
      } else {
        categories = this.data.category;
      }
      for (let j = 0; j < categories.length; j++) {
        item.push(this.getNameOfCategory(Number(categories[j])));
      }
      this.categoryName = item.toString();
    }
  }

  getNameOfCategory(category: number) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == category) {
        return this.categories[i].name;
      }
    }
  }
}
