import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-upload-crop',
  templateUrl: './upload-crop.component.html',
  styleUrls: ['./upload-crop.component.scss'],
})
export class UploadCropComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  /* CROPPER */

  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }
  cropImg(e: ImageCroppedEvent) {
    console.log(e);
    this.cropImgPreview = e.base64;
  }
  imgLoad() {}
  initCropper() {}

  imgFailed() {}
}
