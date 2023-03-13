import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionsType } from 'src/app/enums/actions-type';
import { AdsModel } from 'src/app/models/ads-model';
import { EmitterModel } from 'src/app/models/emitter-model';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent implements OnInit {
  @Input() public data!: AdsModel;
  @Input() public edit: boolean = false;
  @Input() public fixed: string = '';
  @Output() clickEmitter: EventEmitter<any> = new EventEmitter();
  public cover: any;
  public showModeButton: boolean = false;

  constructor(private apiService: CallApiService) {}

  ngOnInit(): void {
    console.log(this.data);
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
}
