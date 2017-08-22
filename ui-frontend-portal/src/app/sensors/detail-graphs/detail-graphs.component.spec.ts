import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGraphsComponent } from './detail-graphs.component';

describe('DetailGraphsComponent', () => {
  let component: DetailGraphsComponent;
  let fixture: ComponentFixture<DetailGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
