import { Component, OnInit } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-dynamic-text-form',
  templateUrl: './dynamic-text-form.component.html',
  styleUrls: ['./dynamic-text-form.component.scss']
})
export class DynamicTextFormComponent implements OnInit {

  constructor(private helpService: HelpService) { }

  ngOnInit(): void {
  }

}
