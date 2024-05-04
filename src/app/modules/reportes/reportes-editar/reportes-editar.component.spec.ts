import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEditarComponent } from './reportes-editar.component';

describe('ReportesEditarComponent', () => {
  let component: ReportesEditarComponent;
  let fixture: ComponentFixture<ReportesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
