import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheEditComponent } from './recherche-edit.component';

describe('RechercheEditComponent', () => {
  let component: RechercheEditComponent;
  let fixture: ComponentFixture<RechercheEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
