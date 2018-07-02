import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieTagComponent } from './axie-tag.component';

describe('AxieTagComponent', () => {
  let component: AxieTagComponent;
  let fixture: ComponentFixture<AxieTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxieTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxieTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
