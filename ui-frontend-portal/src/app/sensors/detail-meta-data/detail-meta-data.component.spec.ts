import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMetaDataComponent } from './detail-meta-data.component';

describe('DetailMetaDataComponent', () => {
  let component: DetailMetaDataComponent;
  let fixture: ComponentFixture<DetailMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
