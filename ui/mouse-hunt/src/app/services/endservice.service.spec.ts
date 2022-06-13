import { TestBed } from '@angular/core/testing';

import { EndserviceService } from './endservice.service';

describe('EndserviceService', () => {
  let service: EndserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
