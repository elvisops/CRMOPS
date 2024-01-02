import { TestBed } from '@angular/core/testing';

import { CuentaEditService } from './cuenta-edit.service';

describe('CuentaEditService', () => {
  let service: CuentaEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
