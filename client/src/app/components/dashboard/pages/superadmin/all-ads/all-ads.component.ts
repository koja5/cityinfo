import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss'],
})
export class AllAdsComponent implements OnInit {
  public path = '/grids/superadmin';
  public file = 'all-ads.json';

  constructor() {}

  ngOnInit(): void {}
}
