import { TestBed } from '@angular/core/testing';

import { CuentaCreateService } from './cuenta-create.service';

describe('CuentaCreateService', () => {
  let service: CuentaCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
