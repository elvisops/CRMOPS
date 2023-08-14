import { TestBed } from '@angular/core/testing';

import { GestionDeContactosService } from './gestion-de-contactos.service';

describe('GestionDeContactosService', () => {
  let service: GestionDeContactosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionDeContactosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
