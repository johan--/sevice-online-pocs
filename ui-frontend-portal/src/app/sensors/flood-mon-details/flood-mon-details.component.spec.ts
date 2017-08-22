import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodMonDetailsComponent } from './flood-mon-details.component';

describe('FloodMonDetailsComponent', () => {
  let component: FloodMonDetailsComponent;
  let fixture: ComponentFixture<FloodMonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloodMonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodMonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
