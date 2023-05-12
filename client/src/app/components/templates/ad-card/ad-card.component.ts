import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActionsType } from 'src/app/enums/actions-type';
import { EmitterModel } from 'src/app/models/emitter-model';
import { PaidAdsModel } from 'src/app/models/paid-ads-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';
import { ToastrComponent } from '../../dynamic-component/common/toastr/toastr.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DialogConfirmComponent } from '../../common/dialog-confirm/dialog-confirm.component';
import { DecisionType } from 'src/app/enums/decision-type';
import { TypeOfComponent } from 'src/app/enums/type-of-component';
import { MessageService } from 'src/app/services/message.service';
import { CardType } from 'src/app/enums/card-type';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent implements OnInit {
  @Input() public type!: string;
  @Input() public data!: any;
  @Input() public additionalInformation!: PaidAdsModel;
  @Input() public edit: boolean = false;
  @Input() public promotion: boolean = false;
  @Input() public fixed: string = '';
  @Input() public showDate: boolean = false;
  @Input() public approveDeny: boolean = false;
  @Input() public approveDenyButton: boolean = true;
  @Input() public showDetailsOnClick: boolean = false;
  @Input() public showMoreActionButton: boolean = true;
  @Input() public scaleOnHover: boolean = false;
  @Output() clickEmitter: EventEmitter<any> = new EventEmitter();
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('options') options!: ElementRef;
  public cover: any;
  public showModeButton: boolean = false;
  public language: any;
  public checkPromoButton = false;
  public optionsVisible = false;
  public confirmDeleteDialog = false;
  public confirmDeactiveCampaign = false;
  public confirmActiveCampaign = false;
  public confirmCancelPromotion = false;
  public dayAWeek!: string;

  constructor(
    private helpService: HelpService,
    private service: CallApiService,
    private toastr: ToastrComponent,
    private renderer: Renderer2,
    public dialogConfirmComponent: DialogConfirmComponent,
    private messageService: MessageService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.options && e.target !== this.options.nativeElement) {
        this.optionsVisible = false;
      }
    });
  }

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

    // this.dialogConfirmComponent.dialogEmitter.subscribe((data) => {
    //   if (data == DecisionType.approve) {
    //     this.deleteButton();
    //   }
    // });
    this.getDayFromDate();
  }

  editButton() {
    this.emitActionClick(ActionsType.edit);
  }

  createDuplicate() {
    this.emitActionClick(ActionsType.createDuplicate);
  }

  promotionButton() {
    this.emitActionClick(ActionsType.promotion);
  }

  emitActionClick(operation: ActionsType) {
    const emitterModel = new EmitterModel();
    emitterModel.operation = operation;
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
    if (
      !this.data.expired_date ||
      (this.data.expired_date && new Date(this.data.expired_date) < new Date())
    ) {
      this.checkPromoButton = true;
    } else {
      this.checkPromoButton = false;
    }
  }

  showDetails() {
    if (this.showDetailsOnClick) {
      this.dialog.show();
    }
  }

  confirmDeleteAction(event: any) {
    if (event == DecisionType.approve) {
      this.emitActionClick(ActionsType.delete);
    } else {
      this.confirmDeleteDialog = false;
    }
  }

  confirmDeactiveCampaignAction(event: any) {
    if (event == DecisionType.approve) {
      this.emitActionClick(ActionsType.deactiveCampaign);
    } else {
      this.confirmDeactiveCampaign = false;
    }
  }

  confirmActiveCampaignAction(event: any) {
    if (event == DecisionType.approve) {
      this.emitActionClick(ActionsType.activeCampaign);
    } else {
      this.confirmActiveCampaign = false;
    }
  }

  confirmCancelPromotionAction(event: any) {
    if (event == DecisionType.approve) {
      this.emitActionClick(ActionsType.cancelPromotion);
    } else {
      this.confirmCancelPromotion = false;
    }
  }

  getDayFromDate() {
    if (this.data.datetime) {
      this.dayAWeek =
        this.language.daysOfWeek[new Date(this.data.datetime).getDay()];
    }
  }

  getCardTypePlace(){
    return CardType.place;
  }
}
