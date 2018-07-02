import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieArtstudioComponent } from './axie-artstudio.component';

describe('AxieArtstudioComponent', () => {
  let component: AxieArtstudioComponent;
  let fixture: ComponentFixture<AxieArtstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxieArtstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxieArtstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
