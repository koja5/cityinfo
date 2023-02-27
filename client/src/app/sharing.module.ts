import { NgModule } from '@angular/core';
import { LoaderSvgComponent } from './components/common/loader-svg/loader-svg.component';
import { LoaderComponent } from './components/common/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent, LoaderSvgComponent],
  imports: [],
  exports: [LoaderComponent, LoaderSvgComponent],
  providers: [],
  bootstrap: []
})
export class SharingModule {}
