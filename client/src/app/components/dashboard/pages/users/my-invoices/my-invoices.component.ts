import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-invoices',
  templateUrl: './my-invoices.component.html',
  styleUrls: ['./my-invoices.component.scss']
})
export class MyInvoicesComponent implements OnInit {

  public path = '/grids/user';
  public file = 'my-invoices.json';

  constructor() { }

  ngOnInit(): void {
  }

}
