import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsDashboardComponent } from './sensors-dashboard.component';

describe('SensorsDashboardComponent', () => {
  let component: SensorsDashboardComponent;
  let fixture: ComponentFixture<SensorsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
