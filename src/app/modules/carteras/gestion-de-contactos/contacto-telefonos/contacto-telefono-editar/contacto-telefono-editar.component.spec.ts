import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoTelefonoEditarComponent } from './contacto-telefono-editar.component';

describe('ContactoTelefonoEditarComponent', () => {
  let component: ContactoTelefonoEditarComponent;
  let fixture: ComponentFixture<ContactoTelefonoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoTelefonoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoTelefonoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
