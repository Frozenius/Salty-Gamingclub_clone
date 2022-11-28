import { TestBed } from '@angular/core/testing';

import { BetteruptimeService } from './betteruptime.service';

describe('BetteruptimeService', () => {
  let service: BetteruptimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetteruptimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
