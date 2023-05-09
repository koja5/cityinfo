import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { first, take } from 'rxjs';
import { DecisionType } from 'src/app/enums/decision-type';
import { HelpService } from 'src/app/services/help.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent implements OnInit {
  @ViewChild('dialog') public dialog!: DialogComponent;
  @Output() public emitAction = new EventEmitter<any>();
  public language: any;
  public DialogObj: any;

  constructor(
    private helpService: HelpService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

  public showDialog() {
    setTimeout(() => {
      this.dialog.show();
    }, 50);
    // this.DialogObj = DialogUtility.confirm({
    //   title: this.language.areYouSureTitle,
    //   content: this.language.actionCantBeReturned,
    //   okButton: { text: this.language.approve, click: this.okClick.bind(this) },
    //   cancelButton: {
    //     text: this.language.cancel,
    //     click: this.cancelClick.bind(this),
    //   },
    //   showCloseIcon: false,
    //   closeOnEscape: false,
    //   cssClass: 'confirm-dialog',
    //   animationSettings: { effect: 'Zoom' },
    // });
  }

  public okClick(): void {
    this.emitAction.emit(DecisionType.approve);
    this.dialog.hide();
  }

  public cancelClick(): void {
    this.emitAction.emit(DecisionType.cancel);
    this.dialog.hide();
  }
}
