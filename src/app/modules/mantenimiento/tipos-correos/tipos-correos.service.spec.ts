import { TestBed } from '@angular/core/testing';

import { TiposCorreosService } from './tipos-correos.service';

describe('TiposCorreosService', () => {
  let service: TiposCorreosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposCorreosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
