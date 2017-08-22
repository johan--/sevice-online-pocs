import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCamerasComponent } from './master-cameras.component';

describe('MasterCamerasComponent', () => {
  let component: MasterCamerasComponent;
  let fixture: ComponentFixture<MasterCamerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCamerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
