import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodMonDashboardComponent } from './flood-mon-dashboard.component';

describe('FloodMonDashboardComponent', () => {
  let component: FloodMonDashboardComponent;
  let fixture: ComponentFixture<FloodMonDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloodMonDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodMonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
