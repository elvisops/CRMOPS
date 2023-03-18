import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDireccionesComponent } from './tipos-direcciones.component';

describe('TiposDireccionesComponent', () => {
  let component: TiposDireccionesComponent;
  let fixture: ComponentFixture<TiposDireccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDireccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
