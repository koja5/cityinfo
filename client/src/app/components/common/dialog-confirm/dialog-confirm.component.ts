import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { DecisionType } from 'src/app/enums/decision-type';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent implements OnInit {
  @Output() public emitAction = new EventEmitter<any>();
  public language: any;
  public DialogObj: any;

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {}

  public showDialog() {
    this.language = this.helpService.getLanguage();
    this.DialogObj = DialogUtility.confirm({
      title: this.language.areYouSureTitle,
      content: this.language.actionCantBeReturned,
      okButton: { text: this.language.approve, click: this.okClick.bind(this) },
      cancelButton: {
        text: this.language.cancel,
        click: this.cancelClick.bind(this),
      },
      showCloseIcon: false,
      closeOnEscape: false,
      cssClass: 'confirm-dialog',
      animationSettings: { effect: 'Zoom' },
    });
  }

  private okClick(): void {
    this.emitAction.emit(DecisionType.approve);
    this.DialogObj.hide();
  }

  private cancelClick(): void {
    this.DialogObj.hide();
  }
}
