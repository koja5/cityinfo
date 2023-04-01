import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  public language: any;

  constructor(private helpService: HelpService) { }

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

}
