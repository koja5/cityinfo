import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { FieldConfig } from '../../models/field-config';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  public config: FieldConfig;
  public group: UntypedFormGroup;
  public language: any;

  constructor(private helpService: HelpService) {
    this.config =  new FieldConfig();
    this.group = new UntypedFormGroup({});
  }

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

}
