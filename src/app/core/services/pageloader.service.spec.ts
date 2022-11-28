import { TestBed } from '@angular/core/testing';

import { PageloaderService } from './pageloader.service';

describe('PageloaderService', () => {
  let service: PageloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
