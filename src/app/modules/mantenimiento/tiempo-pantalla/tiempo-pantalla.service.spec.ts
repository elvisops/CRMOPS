import { TestBed } from '@angular/core/testing';

import { TiempoPantallaService } from './tiempo-pantalla.service';

describe('TiempoPantallaService', () => {
  let service: TiempoPantallaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiempoPantallaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
