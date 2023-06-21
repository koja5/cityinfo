import { Component, Input, OnInit } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnInit {

  @Input() id!: string;

  public showButtons = false;
  public language: any;
  public link!: string;

  constructor(private helpService: HelpService) { }

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.link = window.location + 'view/' + this.id;
  }

}
