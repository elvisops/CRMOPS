import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoDireccionesComponent } from './contacto-direcciones.component';

describe('ContactoDireccionesComponent', () => {
  let component: ContactoDireccionesComponent;
  let fixture: ComponentFixture<ContactoDireccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoDireccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoDireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
