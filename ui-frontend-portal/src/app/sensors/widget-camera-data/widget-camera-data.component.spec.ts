import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCameraDataComponent } from './widget-camera-data.component';

describe('WidgetCameraDataComponent', () => {
  let component: WidgetCameraDataComponent;
  let fixture: ComponentFixture<WidgetCameraDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetCameraDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetCameraDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
