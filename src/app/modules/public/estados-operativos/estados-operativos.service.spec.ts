import { TestBed } from '@angular/core/testing';

import { EstadosOperativosService } from './estados-operativos.service';

describe('EstadosOperativosService', () => {
  let service: EstadosOperativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosOperativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
