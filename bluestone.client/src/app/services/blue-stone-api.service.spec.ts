import { TestBed } from '@angular/core/testing';

import { BlueStoneApiService } from './blue-stone-api.service';

describe('BlueStoneApiService', () => {
  let service: BlueStoneApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlueStoneApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
