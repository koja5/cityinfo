import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { LoaderSvgComponent } from './components/common/loader-svg/loader-svg.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { LoaderContentComponent } from './components/dynamic-component/common/loader-content/loader-content.component';
import { AdCardComponent } from './components/templates/ad-card/ad-card.component';

@NgModule({
  declarations: [
    LoaderComponent,
    LoaderSvgComponent,
    LoaderContentComponent,
    AdCardComponent,
  ],
  imports: [CommonModule, DialogModule],
  exports: [
    LoaderComponent,
    LoaderSvgComponent,
    LoaderContentComponent,
    AdCardComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class SharingModule {}
