import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSettingComponent } from './partner-setting.component';

describe('PartnerSettingComponent', () => {
  let component: PartnerSettingComponent;
  let fixture: ComponentFixture<PartnerSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
