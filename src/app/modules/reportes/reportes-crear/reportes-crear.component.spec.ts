import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCrearComponent } from './reportes-crear.component';

describe('ReportesCrearComponent', () => {
  let component: ReportesCrearComponent;
  let fixture: ComponentFixture<ReportesCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
