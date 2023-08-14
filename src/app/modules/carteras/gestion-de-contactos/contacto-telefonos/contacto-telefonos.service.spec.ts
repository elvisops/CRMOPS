import { TestBed } from '@angular/core/testing';

import { ContactoTelefonosService } from './contacto-telefonos.service';

describe('ContactoTelefonosService', () => {
  let service: ContactoTelefonosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoTelefonosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
