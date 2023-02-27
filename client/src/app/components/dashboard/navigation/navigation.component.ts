import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public menu: any = [];
  public language: any;
  public items: ItemModel[] = [
    {
      text: 'Podešavanja',
      id: 'settings',
      iconCss: 'e-icons e-settings',
    },
    {
      separator: true,
    },
    {
      text: 'Odjavi se',
      id: 'logout',
    },
  ];
  public username!: string;

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initializationMenu();
    this.username = this.helpService.getUserNameFromToken();
  }

  initializationMenu() {
    this.configurationService
      .getConfiguration('/navigation-menu', 'navigation-menu.json')
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].rights) {
            if (this.helpService.checkRights(data[i].rights)) {
              this.menu.push(data[i]);
            }
          } else if (data[i].menu) {
            for (let j = 0; j < data[i].menu.length; j++) {
              if (this.helpService.checkRights(data[i].menu[j].rights)) {
                this.menu.push(data[i]);
              }
            }
          }
        }
        // this.initialCollapseMenu();
      });
  }

  profileIconSelectEvent(event: MenuEventArgs) {
    switch (event.item.id) {
      case 'settings':
        this.router.navigate(['dashboard/settings/change-personal-info']);
        break;
      case 'logout':
        this.logout();
        break;
      default:
        break;
    }
  }

  logout() {
    this.storageService.deleteToken();
    this.router.navigate(['/login']);
  }
}
