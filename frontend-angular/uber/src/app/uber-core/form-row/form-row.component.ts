import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss']
})
export class FormRowComponent implements OnInit {

  @Input() errors: Array<string> = null;

  constructor() { }

  ngOnInit() {
  }

}
