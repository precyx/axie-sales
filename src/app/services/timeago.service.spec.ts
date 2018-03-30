import { TestBed, inject } from '@angular/core/testing';

import { TimeagoService } from './timeago.service';

describe('TimeagoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeagoService]
    });
  });

  it('should be created', inject([TimeagoService], (service: TimeagoService) => {
    expect(service).toBeTruthy();
  }));
});
