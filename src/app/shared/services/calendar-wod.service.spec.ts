import { TestBed } from '@angular/core/testing';

import { CalendarWodService } from './calendar-wod.service';

describe('CalendarService', () => {
  let service: CalendarWodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarWodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
