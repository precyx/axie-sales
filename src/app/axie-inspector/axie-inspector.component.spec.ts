import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieInspectorComponent } from './axie-inspector.component';

describe('AxieInspectorComponent', () => {
  let component: AxieInspectorComponent;
  let fixture: ComponentFixture<AxieInspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxieInspectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxieInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
