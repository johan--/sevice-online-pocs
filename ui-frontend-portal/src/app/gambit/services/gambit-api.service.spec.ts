import { TestBed, inject } from '@angular/core/testing';

import { GambitApiService } from './gambit-api.service';

describe('GambitApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GambitApiService]
    });
  });

  it('should ...', inject([GambitApiService], (service: GambitApiService) => {
    expect(service).toBeTruthy();
  }));
});
