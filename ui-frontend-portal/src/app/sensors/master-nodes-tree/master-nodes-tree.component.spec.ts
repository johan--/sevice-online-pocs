import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNodesTreeComponent } from './master-nodes-tree.component';

describe('MasterNodesTreeComponent', () => {
  let component: MasterNodesTreeComponent;
  let fixture: ComponentFixture<MasterNodesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterNodesTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNodesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
