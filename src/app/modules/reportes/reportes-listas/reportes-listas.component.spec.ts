import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesListasComponent } from './reportes-listas.component';

describe('ReportesListasComponent', () => {
  let component: ReportesListasComponent;
  let fixture: ComponentFixture<ReportesListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
