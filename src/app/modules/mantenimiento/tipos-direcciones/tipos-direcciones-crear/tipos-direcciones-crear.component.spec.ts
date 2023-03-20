import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDireccionesCrearComponent } from './tipos-direcciones-crear.component';

describe('TiposDireccionesCrearComponent', () => {
  let component: TiposDireccionesCrearComponent;
  let fixture: ComponentFixture<TiposDireccionesCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDireccionesCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDireccionesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
