import { TestBed, inject } from '@angular/core/testing';

import { DashboardContextService } from './dashboard-context.service';

describe('DashboardContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardContextService]
    });
  });

  it('should ...', inject([DashboardContextService], (service: DashboardContextService) => {
    expect(service).toBeTruthy();
  }));
});
