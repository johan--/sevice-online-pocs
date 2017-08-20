import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef, EventEmitter,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit, Output,
  Renderer2,
  ViewContainerRef,
  Sanitizer, SecurityContext, HostListener,
} from '@angular/core';
import {NgbModal, NgbModalRef, NgbPopover, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {DateTimeRangePickerComponent} from './date-time-range-picker.component';
import {
  DateTimeRange,
  DateTimeRangePickerOptionsStruct
} from './date-time-range-picker.model';

/**
 * A directive that creates a Modal dialog or a Popover containing the date-time-range-picker.
 */
@Directive({selector: '[dateTimeRangePicker]'})
export class DateTimeRangePickerDirective implements OnInit, OnDestroy {

  private popover: NgbPopover;

  private componentRef: ComponentRef<DateTimeRangePickerComponent>;

  private modalRef: NgbModalRef = null;

  @Output() rangeChange = new EventEmitter<DateTimeRange>();

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2,
              private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private config: NgbPopoverConfig,
              private ngZone: NgZone,
              private sanitizer: Sanitizer,
              private modalService: NgbModal) {


    const factory = componentFactoryResolver.resolveComponentFactory(DateTimeRangePickerComponent);
    this.componentRef = viewContainerRef.createComponent(factory);
    this.componentRef.instance.options = {modal: true};
    this.componentRef.instance.apply.subscribe(range => {
      if (this.componentRef.instance.options.modal) {
        this.closeModal();
      }
      if (this.componentRef.instance.options.popup) {
        this.popover.close();
      }

      if (range) {
        this.updateText();
        this.rangeChange.emit(range);
      }

    });

  }

  @Input()
  set dateTimeRangePicker(opt: DateTimeRangePickerOptionsStruct) {
    this.componentRef.instance.options = opt;
    this.updateText();
  }

  updateText() {
    const text = this.componentRef.instance.asDisplayText();
    // console.log('updateText', text, this._elementRef.nativeElement);
    // console.log('this.componentRef.instance', text, this.componentRef.instance);
    if (this._elementRef.nativeElement.tagName === 'INPUT') {
      this._elementRef.nativeElement.value = text;
    } else {
      this._elementRef.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, text);
    }

  }

  ngOnInit() {
    if (this.componentRef.instance.options.popup) {
      this.popover = new NgbPopover(this._elementRef, this._renderer, this.injector, this.componentFactoryResolver,
        this.viewContainerRef, this.config, this.ngZone);
      this.popover.container = 'body';
      this.popover.placement = 'right';
      this.popover.ngbPopover = this.componentRef.instance.picker;
      this.popover.ngOnInit();
    }
    this.updateText();

  }

  ngOnDestroy() {
    if (this.componentRef.instance.options.popup) {
      this.popover.ngOnDestroy();
    }

  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
  }

  @HostListener('click')
  onClick() {
    if (!this.componentRef.instance.options.modal) {
      return;
    }
    this.closeModal();

    this.modalRef = this.modalService.open(this.componentRef.instance.picker, {
      windowClass: 'dateTimeRangePicker'
    });
  }
}
