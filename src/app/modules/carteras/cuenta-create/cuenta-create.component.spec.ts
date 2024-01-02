import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCreateComponent } from './cuenta-create.component';

describe('CuentaCreateComponent', () => {
  let component: CuentaCreateComponent;
  let fixture: ComponentFixture<CuentaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
