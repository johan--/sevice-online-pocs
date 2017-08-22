import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersManagementComponent } from './vouchers-management.component';

describe('VouchersManagementComponent', () => {
  let component: VouchersManagementComponent;
  let fixture: ComponentFixture<VouchersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
