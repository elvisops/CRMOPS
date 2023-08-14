import { TestBed } from '@angular/core/testing';

import { CarterasService } from './carteras.service';

describe('CarterasService', () => {
  let service: CarterasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarterasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
