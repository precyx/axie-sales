import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieSalesComponent } from './axie-sales.component';

describe('AxieSalesComponent', () => {
  let component: AxieSalesComponent;
  let fixture: ComponentFixture<AxieSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxieSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxieSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
