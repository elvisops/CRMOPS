import { TestBed } from '@angular/core/testing';

import { PanelInicioService } from './panel-inicio.service';

describe('PanelInicioService', () => {
  let service: PanelInicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelInicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
