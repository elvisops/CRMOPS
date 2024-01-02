import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaEditComponent } from './cuenta-edit.component';

describe('CuentaEditComponent', () => {
  let component: CuentaEditComponent;
  let fixture: ComponentFixture<CuentaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
