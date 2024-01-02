import { TestBed } from '@angular/core/testing';

import { ReportesListasService } from './reportes-listas.service';

describe('ReportesListasService', () => {
  let service: ReportesListasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesListasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
