import { TestBed, async, inject } from '@angular/core/testing';

import { UserRequiredGuard } from './user-required.guard';

describe('UserRequiredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRequiredGuard]
    });
  });

  it('should ...', inject([UserRequiredGuard], (guard: UserRequiredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
