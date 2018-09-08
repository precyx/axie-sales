import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieStatsComponent } from './axie-stats.component';

describe('AxieStatsComponent', () => {
  let component: AxieStatsComponent;
  let fixture: ComponentFixture<AxieStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxieStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxieStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
