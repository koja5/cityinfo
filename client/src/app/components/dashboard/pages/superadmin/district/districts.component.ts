import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-district',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent implements OnInit {

  public path = '/grids/superadmin';
  public file = 'districts.json';

  constructor() { }

  ngOnInit(): void {
  }

}
