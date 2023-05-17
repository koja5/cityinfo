import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-places',
  templateUrl: './all-places.component.html',
  styleUrls: ['./all-places.component.scss'],
})
export class AllPlacesComponent implements OnInit {
  public path = '/grids/superadmin';
  public file = 'all-places.json';

  constructor() {}

  ngOnInit(): void {}
}
