import { TestBed } from '@angular/core/testing';

import { CarrentService } from './carrent.service';

describe('CarrentService', () => {
  let service: CarrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
