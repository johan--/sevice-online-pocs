import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss']
})
export class FormRowComponent implements OnInit {

  @Input() errors: Array<string> = null;

  /*
  @Input('label-select') labelSelect = 'label';

  @Input('content-select') contentSelect = 'input';

  @Input('message-select') messageSelect = '.message';
  */

  constructor() { }

  ngOnInit() {
  }

}
