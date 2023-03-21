import { TestBed } from '@angular/core/testing';

import { TiposDireccionesService } from './tipos-direcciones.service';

describe('TiposDireccionesService', () => {
  let service: TiposDireccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposDireccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
