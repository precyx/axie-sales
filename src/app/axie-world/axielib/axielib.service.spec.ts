import { TestBed, inject } from '@angular/core/testing';

import { AxielibService } from './axielib.service';

describe('AxielibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AxielibService]
    });
  });

  it('should be created', inject([AxielibService], (service: AxielibService) => {
    expect(service).toBeTruthy();
  }));
});
