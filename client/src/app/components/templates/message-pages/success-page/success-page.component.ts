import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {

  public language: any;

  constructor(private helpService: HelpService) { }

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

}
