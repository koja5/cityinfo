import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselAnimationEffect } from '@syncfusion/ej2-angular-navigations';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  public carouselAnimation: CarouselAnimationEffect = 'Fade';
  public gallery: any;
  public data: any;
  public language: any;
  public showHideMenu = '';
  public categories: any;

  constructor(
    private helpService: HelpService,
    private service: CallApiService,
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initialize();
  }

  initialize() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service
      .callGetMethod('/api/getPlaceById/', id!)
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.data = data[0];
          this.updateTags();
          this.data.cover = this.helpService.convertCoverPath(this.data.cover);
          if (this.data.gallery && this.data.gallery.length > 0) {
            this.gallery = this.helpService.getImagesForGallery(
              this.data.gallery
            );
          }
        }
      });

    this.getCategories();
  }

  updateTags() {
    this.metaService.updateMetaTags({
      title: this.data.name,
      type: 'website',
      imageSrc: window.location.origin + this.data.cover.split('/dist')[1],
      url: window.location.href,
      description: this.data.description,
      cardType: 'summary_large_image',
    });
  }

  getCategories() {
    this.service.callGetMethod('api/getCategories', '').subscribe((data) => {
      this.categories = data;
    });
  }

  showHideMobileMenu() {
    if (this.showHideMenu === '') {
      this.showHideMenu = 'block';
    } else {
      this.showHideMenu = '';
    }
  }

  public getThumpImage(index: number): string {
    return this.gallery[index];
  }
}
