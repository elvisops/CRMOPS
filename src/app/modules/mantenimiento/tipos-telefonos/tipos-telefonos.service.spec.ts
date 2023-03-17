import { TestBed } from '@angular/core/testing';

import { TiposTelefonosService } from './tipos-telefonos.service';

describe('TiposTelefonosService', () => {
  let service: TiposTelefonosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposTelefonosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
