import { TestBed } from '@angular/core/testing';

import { WodServiceService } from './wod-service.service';

describe('WodServiceService', () => {
  let service: WodServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WodServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
