import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  public path = '/grids/superadmin';
  public file = 'cities.json';

  constructor() { }

  ngOnInit(): void {
  }

}
