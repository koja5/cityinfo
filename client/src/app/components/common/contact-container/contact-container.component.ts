import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss'],
})
export class ContactContainerComponent implements OnInit {
  @Input() data: any;
  @Input() language: any;

  constructor() {}

  ngOnInit(): void {}
}
