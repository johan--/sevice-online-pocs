import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class PageData {
  /**
   * Current page number
   */
  public number = 0;

  /**
   * Count of pages
   */
  public totalPages = 0;

  /**
   * Maximum amount of elements on a page
   */
  public size = 0;

  /**
   * Actual number of elements on the current page
   */
  public numberOfElements = 0;

  /**
   * Total amount of available elements that can be pages through
   */
  public totalElements = 0;

  constructor(source: any = {}) {
    if (source.number !== undefined) {
      this.number = source.number;
    }
    if (source.totalPages !== undefined) {
      this.totalPages = source.totalPages;
    }
    if (source.size !== undefined) {
      this.size = source.size;
    }
    if (source.numberOfElements !== undefined) {
      this.numberOfElements = source.numberOfElements;
    }
    if (source.totalElements !== undefined) {
      this.totalElements = source.totalElements;
    }
  }

}

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() onNavigate = new EventEmitter<number>();

  @Input() showPages = 11;

  pd: PageData;

  hasData = false;

  hasPrevious = false;

  hasNext = false;

  pages: Array<number> = [];

  constructor() {
  }

  ngOnInit() {

  }

  @Input() set pageData(data: PageData) {
    this.pd = data;
    this.updateValues();
  }

  updateValues() {
    this.hasData = !!this.pd;
    if (!this.pd) {
      return;
    }
    this.hasPrevious = this.pd.number > 0;
    this.hasNext = this.pd.number + 1 < this.pd.totalPages;
    this.pages = this.getPages();
    // console.log('pagedata', this);
  }

  goTo(page: number) {
    if (!this.pd || page < 0 || page >= this.pd.totalPages) {
      return;
    }
    this.onNavigate.next(page);
  }

  isActive(page: number) {
    return this.pd.number === page;
  }

  getPages() {
    const halfShow = Math.floor(this.showPages / 2);
    let start = 0, end = Math.min(this.pd.totalPages, this.showPages);
    if (this.pd.number > halfShow && end >= this.showPages) {
      start = Math.min(this.pd.number - halfShow, this.pd.totalPages - this.showPages);
    }
    if (this.pd.number > this.showPages - halfShow) {
      end = Math.min(this.pd.number + halfShow, this.pd.totalPages);
    }
    // console.log('start: ' + start, 'end: ' + end, 'halfShow: ' + halfShow);
    const pages = [];
    for (let p = start; p < end; p++) {
      pages.push(p);
    }
    return pages;
  }


}
