import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoConfirmacionesComponent } from './contacto-confirmaciones.component';

describe('ContactoConfirmacionesComponent', () => {
  let component: ContactoConfirmacionesComponent;
  let fixture: ComponentFixture<ContactoConfirmacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoConfirmacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoConfirmacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
