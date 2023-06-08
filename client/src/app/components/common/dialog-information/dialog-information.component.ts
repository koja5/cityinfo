import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-information',
  templateUrl: './dialog-information.component.html',
  styleUrls: ['./dialog-information.component.scss']
})
export class DialogInformationComponent implements OnInit {

  @Input() data: any
  @Input() language: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
