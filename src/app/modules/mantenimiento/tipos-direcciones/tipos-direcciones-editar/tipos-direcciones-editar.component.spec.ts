import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDireccionesEditarComponent } from './tipos-direcciones-editar.component';

describe('TiposDireccionesEditarComponent', () => {
  let component: TiposDireccionesEditarComponent;
  let fixture: ComponentFixture<TiposDireccionesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDireccionesEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDireccionesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
