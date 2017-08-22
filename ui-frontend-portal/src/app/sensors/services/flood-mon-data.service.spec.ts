import { TestBed, inject } from '@angular/core/testing';

import { FloodMonDataService } from './flood-mon-data.service';

describe('FloodMonDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloodMonDataService]
    });
  });

  it('should ...', inject([FloodMonDataService], (service: FloodMonDataService) => {
    expect(service).toBeTruthy();
  }));
});
