import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsMapComponent } from './visitors-map.component';

describe('VisitorsMapComponent', () => {
  let component: VisitorsMapComponent;
  let fixture: ComponentFixture<VisitorsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
