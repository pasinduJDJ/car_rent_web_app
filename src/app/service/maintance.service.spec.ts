import { TestBed } from '@angular/core/testing';

import { MaintanceService } from './maintance.service';

describe('MaintanceService', () => {
  let service: MaintanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
