import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxiePartIconComponent } from './axie-part-icon.component';

describe('AxiePartIconComponent', () => {
  let component: AxiePartIconComponent;
  let fixture: ComponentFixture<AxiePartIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxiePartIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxiePartIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
