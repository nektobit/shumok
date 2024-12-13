import { TestBed } from '@angular/core/testing';

import { AudioControlService } from './audio-control.service';

describe('AudioControlService', () => {
  let service: AudioControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
