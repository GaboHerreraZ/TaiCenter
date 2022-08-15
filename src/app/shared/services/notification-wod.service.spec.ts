import { TestBed } from '@angular/core/testing';

import { NotificationWodService } from './notification-wod.service';

describe('NotificationWodService', () => {
  let service: NotificationWodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationWodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
