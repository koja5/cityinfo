import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-right-of-withdrawal',
  templateUrl: './right-of-withdrawal.component.html',
  styleUrls: ['./right-of-withdrawal.component.scss'],
})
export class RightOfWithdrawalComponent implements OnInit {
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
