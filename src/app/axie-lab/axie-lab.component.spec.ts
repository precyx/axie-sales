import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieLabComponent } from './axie-lab.component';

describe('AxieLabComponent', () => {
  let component: AxieLabComponent;
  let fixture: ComponentFixture<AxieLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxieLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxieLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
