import { TestBed, inject } from '@angular/core/testing';

import { ChartDataService } from './chart-data.service';

describe('ChartDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartDataService]
    });
  });

  it('should ...', inject([ChartDataService], (service: ChartDataService) => {
    expect(service).toBeTruthy();
  }));
});
