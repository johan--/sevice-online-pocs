import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAlarmComponent } from './widget-alarm.component';

describe('WidgetAlarmComponent', () => {
  let component: WidgetAlarmComponent;
  let fixture: ComponentFixture<WidgetAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
