import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit {
  public path = '/grids/superadmin';
  public file = 'all-events.json';

  constructor() { }

  ngOnInit(): void {
  }

}
