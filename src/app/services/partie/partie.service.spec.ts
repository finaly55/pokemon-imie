import { TestBed } from '@angular/core/testing';

import { PartieService } from './partie.service';

describe('PartieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartieService = TestBed.get(PartieService);
    expect(service).toBeTruthy();
  });
});
