import { TestBed, inject } from '@angular/core/testing';

import { PersistenceApiService } from './persistence-api.service';

describe('PersistenceApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistenceApiService]
    });
  });

  it('should ...', inject([PersistenceApiService], (service: PersistenceApiService) => {
    expect(service).toBeTruthy();
  }));
});
