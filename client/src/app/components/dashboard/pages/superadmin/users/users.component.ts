import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public path = '/grids/superadmin';
  public file = 'users.json';

  constructor() { }

  ngOnInit(): void {
  }

}
