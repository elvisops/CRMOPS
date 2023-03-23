import { TestBed } from '@angular/core/testing';

import { RolesVistasService } from './roles-vistas.service';

describe('RolesVistasService', () => {
  let service: RolesVistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesVistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
