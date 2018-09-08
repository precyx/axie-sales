import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxiePartsComponent } from './axie-parts.component';

describe('AxiePartsComponent', () => {
  let component: AxiePartsComponent;
  let fixture: ComponentFixture<AxiePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxiePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxiePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
