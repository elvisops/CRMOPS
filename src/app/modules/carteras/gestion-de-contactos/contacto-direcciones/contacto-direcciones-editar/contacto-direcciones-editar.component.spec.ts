import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoDireccionesEditarComponent } from './contacto-direcciones-editar.component';

describe('ContactoDireccionesEditarComponent', () => {
  let component: ContactoDireccionesEditarComponent;
  let fixture: ComponentFixture<ContactoDireccionesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoDireccionesEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoDireccionesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
