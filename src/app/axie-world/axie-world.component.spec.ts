import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieWorldComponent } from './axie-world.component';

describe('AxieWorldComponent', () => {
  let component: AxieWorldComponent;
  let fixture: ComponentFixture<AxieWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxieWorldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxieWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
