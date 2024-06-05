import { TestBed } from '@angular/core/testing';

import { ExtensionesUsuariosService } from './extensiones-usuarios.service';

describe('ExtensionesUsuariosService', () => {
  let service: ExtensionesUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtensionesUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
