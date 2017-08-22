/*
 * Copyright (c) 2017 Bosch Software Innovations GmbH, Germany. All rights reserved.
 */

import { Component, Directive, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirmation-dialog',
  template: `<div class="modal-header">
    <h4 class="modal-title">Confirmation</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>
      <ng-container *ngIf="text">{{text}}</ng-container>
      <ng-container *ngIf="!text">Do you confirm this action?</ng-container>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="activeModal.close(true)">
      <ng-container *ngIf="confirmLabel">{{confirmLabel}}</ng-container>
      <ng-container *ngIf="!confirmLabel">Confirm</ng-container>
    </button>
    <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">
      <ng-container *ngIf="abortLabel">{{abortLabel}}</ng-container>
      <ng-container *ngIf="!abortLabel">Cancel</ng-container>
    </button>
  </div>`
})
export class ConfirmationDialogComponent {

  @Input() text: string;
  @Input() abortLabel: string;
  @Input() confirmLabel: string;

  constructor(public activeModal: NgbActiveModal) {}
}

@Directive({
  selector: '[confirmation]',
})
export class ConfirmationDirective {

  @Input() confirmation: string;

  @Input() confirmLabel: string;

  @Input() abortLabel: string;

  @Output() confirmed = new EventEmitter();

  @Output() aborted = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  @HostListener('click') onClick() {
    this.showDialog();
  }

  showDialog() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.componentInstance.text = this.confirmation;
    modalRef.componentInstance.confirmLabel = this.confirmLabel;
    modalRef.componentInstance.abortLabel = this.abortLabel;

    modalRef.result.then(confirmed => {
      this.confirmed.next(confirmed);
    }, () => {
      this.aborted.next(true);
    });
  }



}
