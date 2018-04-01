import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieAdoptedComponent } from './axie-adopted.component';

describe('AxieAdoptedComponent', () => {
  let component: AxieAdoptedComponent;
  let fixture: ComponentFixture<AxieAdoptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxieAdoptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxieAdoptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
