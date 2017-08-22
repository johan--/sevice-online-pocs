/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NodeInfoService } from './node-info.service';

describe('NodeInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeInfoService]
    });
  });

  it('should ...', inject([NodeInfoService], (service: NodeInfoService) => {
    expect(service).toBeTruthy();
  }));
});
