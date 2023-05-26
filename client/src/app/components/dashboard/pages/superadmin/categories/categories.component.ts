import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public path = '/grids/superadmin';
  public file = 'categories.json';

  constructor() { }

  ngOnInit(): void {
  }

}
