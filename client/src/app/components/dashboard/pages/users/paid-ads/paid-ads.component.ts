import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paid-ads',
  templateUrl: './paid-ads.component.html',
  styleUrls: ['./paid-ads.component.scss'],
})
export class PaidAdsComponent implements OnInit {
  public path = '/grids/user';
  public file = 'paid-ads.json';

  constructor() {}

  ngOnInit(): void {}
}
