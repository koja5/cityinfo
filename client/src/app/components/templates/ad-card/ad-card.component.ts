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
import { Meta, Title } from '@angular/platform-browser';
import { StateChange } from 'ng-lazyload-image';
import { CarouselAnimationEffect } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent implements OnInit {
  @Input() public type!: any;
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
  @Input() public categories: any;
  @Output() clickEmitter: EventEmitter<any> = new EventEmitter();
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('options') options!: ElementRef;
  public carouselAnimation: CarouselAnimationEffect = 'Fade';
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
  public categoryName!: string;
  public skeleton = true;
  public imagePreview = '';
  public gallery: any;

  constructor(
    private helpService: HelpService,
    private service: CallApiService,
    private toastr: ToastrComponent,
    private renderer: Renderer2,
    public dialogConfirmComponent: DialogConfirmComponent,
    private messageService: MessageService,
    private meta: Meta,
    private title: Title
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
    this.convertCategoryToRealName();
    if (this.data.gallery && this.data.gallery.length > 0) {
      this.gallery = this.helpService.getImagesForGallery(this.data.gallery);
    }
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
      .subscribe((data: any) => {
        if (data) {
          this.toastr.showSuccess();
          this.additionalInformation.active = 1;
        } else {
          this.toastr.showError();
        }
      });
  }

  denyAd() {
    this.service
      .callPostMethod('/api/denyAd', this.data)
      .subscribe((data: any) => {
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
      (this.data && !this.data.expired_date) ||
      (this.data &&
        this.data.expired_date &&
        new Date(this.data.expired_date) < new Date())
    ) {
      this.checkPromoButton = true;
    } else {
      this.checkPromoButton = false;
    }
  }

  showDetails() {
    if (this.showDetailsOnClick) {
      this.title.setTitle(this.data.name);
      this.meta.updateTag({
        name: 'description',
        content: this.data.description,
      });
      this.dialog.show();
    }
  }

  closeDialog() {
    this.title.setTitle('City-Info');
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
    if (this.data && this.data.datetime) {
      this.dayAWeek =
        this.language.daysOfWeek[new Date(this.data.datetime).getDay()];
    }
  }

  getCardTypePlace() {
    return CardType.place;
  }

  convertCategoryToRealName() {
    if (this.data.category) {
      let item = [];
      let categories = [];
      if (typeof this.data.category === 'string') {
        categories = this.data.category.split(',');
      } else {
        categories = this.data.category;
      }
      for (let j = 0; j < categories.length; j++) {
        item.push(this.getNameOfCategory(Number(categories[j])));
      }
      this.categoryName = item.toString();
    }
  }

  getNameOfCategory(category: number) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == category) {
        return this.categories[i].name;
      }
    }
  }

  myCallbackFunction(event: StateChange) {
    console.log(event.reason);
    switch (event.reason) {
      case 'setup':
        this.skeleton = true;
        this.imagePreview = 'hide';
        break;
      case 'observer-emit':
        this.skeleton = false;
        this.imagePreview = '';
        break;
      case 'start-loading':
        this.skeleton = true;
        this.imagePreview = 'hide';
        break;
      case 'mount-image':
        // The image has been loaded successfully so lets put it into the DOM
        break;
      case 'loading-succeeded':
        // The image has successfully been loaded and placed into the DOM
        break;
      case 'loading-failed':
        this.skeleton = true;
        this.imagePreview = 'hide';
        break;
      case 'finally':
        this.skeleton = false;
        this.imagePreview = '';
        break;
    }
  }

  public getThumpImage(index: number): string {
    return this.gallery[index];
  }
}
