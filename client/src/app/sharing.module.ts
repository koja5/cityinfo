import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { LoaderSvgComponent } from './components/common/loader-svg/loader-svg.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { LoaderContentComponent } from './components/dynamic-component/common/loader-content/loader-content.component';
import { AdCardComponent } from './components/templates/ad-card/ad-card.component';
import { InvoiceComponent } from './components/templates/invoice/invoice.component';
import { NotFoundComponent } from './components/templates/not-found/not-found.component';
import { DialogConfirmComponent } from './components/common/dialog-confirm/dialog-confirm.component';
import { DialogInformationComponent } from './components/common/dialog-information/dialog-information.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";
import { ShareButtonsComponent } from './components/common/share-buttons/share-buttons.component';
import { BadgeComponent } from './components/common/badge/badge.component';
import { ViewComponent } from './components/common/view/view.component';
import { ContactContainerComponent } from './components/common/contact-container/contact-container.component';
import { FooterComponent } from './components/common/footer/footer.component';

@NgModule({
  declarations: [
    LoaderComponent,
    LoaderSvgComponent,
    LoaderContentComponent,
    AdCardComponent,
    NotFoundComponent,
    InvoiceComponent,
    DialogConfirmComponent,
    DialogInformationComponent,
    ShareButtonsComponent,
    ViewComponent,
    BadgeComponent,
    ContactContainerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    LazyLoadImageModule,
    CarouselModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse' }),
  ],
  exports: [
    LoaderComponent,
    LoaderSvgComponent,
    LoaderContentComponent,
    AdCardComponent,
    NotFoundComponent,
    InvoiceComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [],
})
export class SharingModule {}
