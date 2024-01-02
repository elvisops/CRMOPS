import { TestBed } from '@angular/core/testing';

import { MonitoresListasService } from './monitores-listas.service';

describe('MonitoresListasService', () => {
  let service: MonitoresListasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoresListasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
