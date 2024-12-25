import { TestBed } from '@angular/core/testing';

import { FreesoundService } from './freesound.service';

describe('FreesoundService', () => {
  let service: FreesoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreesoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
