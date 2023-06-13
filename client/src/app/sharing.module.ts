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
  ],
  imports: [
    CommonModule,
    DialogModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse' }),
  ],
  exports: [
    LoaderComponent,
    LoaderSvgComponent,
    LoaderContentComponent,
    AdCardComponent,
    NotFoundComponent,
    InvoiceComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class SharingModule {}
