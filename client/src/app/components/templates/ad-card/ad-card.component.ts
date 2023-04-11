import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionsType } from 'src/app/enums/actions-type';
import { AdsModel } from 'src/app/models/ads-model';
import { EmitterModel } from 'src/app/models/emitter-model';
import { PaidAdsModel } from 'src/app/models/paid-ads-model';
import { PaymentAdsModel } from 'src/app/models/payment-ads-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';
import { ToastrComponent } from '../../dynamic-component/common/toastr/toastr.component';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent implements OnInit {
  @Input() public data!: any;
  @Input() public additionalInformation!: PaidAdsModel;
  @Input() public edit: boolean = false;
  @Input() public promotion: boolean = false;
  @Input() public fixed: string = '';
  @Input() public showDate: boolean = false;
  @Input() public approveDeny: boolean = false;
  @Input() public approveDenyButton: boolean = true;
  @Output() clickEmitter: EventEmitter<any> = new EventEmitter();
  public cover: any;
  public showModeButton: boolean = false;
  public language: any;
  public checkPromoButton = false;

  constructor(
    private helpService: HelpService,
    private service: CallApiService,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    if (this.data) {
      if (this.data.description && this.data.description?.length > 30) {
        this.showModeButton = true;
      }

      if (!this.data.cover) {
        this.cover = '../../../../assets/images/no-photo-available.png';
      } else {
        let data = this.data.cover.split('/assets');
        if (data.length == 1) {
          data = this.data.cover.split('\\assets');
        }
        this.cover = '/assets' + data[1];
      }
    }
    this.checkPromoButtonOption();
  }

  editButton() {
    const emitterModel = new EmitterModel();
    emitterModel.operation = ActionsType.edit;
    emitterModel.data = this.data;
    this.clickEmitter.emit(emitterModel);
  }

  deleteButton() {
    const emitterModel = new EmitterModel();
    emitterModel.operation = ActionsType.delete;
    emitterModel.data = this.data;
    this.clickEmitter.emit(emitterModel);
  }

  promotionButton() {
    const emitterModel = new EmitterModel();
    emitterModel.operation = ActionsType.promotion;
    emitterModel.data = this.data;
    this.clickEmitter.emit(emitterModel);
  }

  approveAd() {
    this.service
      .callPostMethod('/api/activeAd', this.data)
      .subscribe((data) => {
        if (data) {
          this.toastr.showSuccess();
          this.additionalInformation.active = 1;
        } else {
          this.toastr.showError();
        }
      });
  }

  denyAd() {
    this.service.callPostMethod('/api/denyAd', this.data).subscribe((data) => {
      if (data) {
        this.toastr.showSuccess();
        this.additionalInformation.active = -1;
      } else {
        this.toastr.showError();
      }
    });
  }

  checkPromoButtonOption() {
    if(!this.data.expired_date || (this.data.expired_date && new Date(this.data.expired_date) < new Date())) {
      this.checkPromoButton = true;
    } else {
      this.checkPromoButton = false;
    }
  }
}
