import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.scss'],
})
export class AllInvoicesComponent implements OnInit {
  public path = '/grids/superadmin';
  public file = 'all-invoices.json';

  constructor() {}

  ngOnInit(): void {}
}
