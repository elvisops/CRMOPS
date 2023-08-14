import { TestBed } from '@angular/core/testing';

import { ContactoCorreosService } from './contacto-correos.service';

describe('ContactoCorreosService', () => {
  let service: ContactoCorreosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoCorreosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
