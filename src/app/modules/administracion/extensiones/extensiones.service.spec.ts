import { TestBed } from '@angular/core/testing';

import { ExtensionesService } from './extensiones.service';

describe('ExtensionesService', () => {
  let service: ExtensionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtensionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
