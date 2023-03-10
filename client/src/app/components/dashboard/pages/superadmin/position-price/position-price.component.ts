import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-price',
  templateUrl: './position-price.component.html',
  styleUrls: ['./position-price.component.scss']
})
export class PositionPriceComponent implements OnInit {

  public path = '/grids/superadmin';
  public file = 'position_price.json';

  constructor() { }

  ngOnInit(): void {
  }

}
