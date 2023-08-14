import { TestBed } from '@angular/core/testing';

import { ContactoDireccionesService } from './contacto-direcciones.service';

describe('ContactoDireccionesService', () => {
  let service: ContactoDireccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoDireccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
