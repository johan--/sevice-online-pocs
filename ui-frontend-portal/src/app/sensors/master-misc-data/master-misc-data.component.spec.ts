import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMiscDataComponent } from './master-misc-data.component';

describe('MasterMiscDataComponent', () => {
  let component: MasterMiscDataComponent;
  let fixture: ComponentFixture<MasterMiscDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMiscDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMiscDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
