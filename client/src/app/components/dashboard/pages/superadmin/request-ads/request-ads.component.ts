import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-ads',
  templateUrl: './request-ads.component.html',
  styleUrls: ['./request-ads.component.scss']
})
export class RequestAdsComponent implements OnInit {

  public path = '/grids/superadmin';
  public file = 'request-ads.json';

  constructor() { }

  ngOnInit(): void {
  }

}
