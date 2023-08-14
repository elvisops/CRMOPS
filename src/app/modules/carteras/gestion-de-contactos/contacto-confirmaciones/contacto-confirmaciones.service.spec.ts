import { TestBed } from '@angular/core/testing';

import { ContactoConfirmacionesService } from './contacto-confirmaciones.service';

describe('ContactoConfirmacionesService', () => {
  let service: ContactoConfirmacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoConfirmacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
