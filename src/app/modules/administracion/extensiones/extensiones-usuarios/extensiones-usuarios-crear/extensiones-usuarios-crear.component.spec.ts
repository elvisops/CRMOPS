import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionesUsuariosCrearComponent } from './extensiones-usuarios-crear.component';

describe('ExtensionesUsuariosCrearComponent', () => {
  let component: ExtensionesUsuariosCrearComponent;
  let fixture: ComponentFixture<ExtensionesUsuariosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionesUsuariosCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionesUsuariosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
