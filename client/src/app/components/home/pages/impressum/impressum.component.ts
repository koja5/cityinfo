import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'],
})
export class ImpressumComponent implements OnInit {
  public showHideMenu = '';
  public language: any;

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.getLanguage().subscribe((data) => {
      this.language = data;
    });
  }

  showHideMobileMenu() {
    if (this.showHideMenu === '') {
      this.showHideMenu = 'block';
    } else {
      this.showHideMenu = '';
    }
  }
}
