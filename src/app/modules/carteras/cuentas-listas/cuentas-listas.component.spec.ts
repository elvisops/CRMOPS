import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasListasComponent } from './cuentas-listas.component';

describe('CuentasListasComponent', () => {
  let component: CuentasListasComponent;
  let fixture: ComponentFixture<CuentasListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
