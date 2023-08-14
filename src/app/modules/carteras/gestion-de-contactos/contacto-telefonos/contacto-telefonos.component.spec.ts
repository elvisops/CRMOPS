import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoTelefonosComponent } from './contacto-telefonos.component';

describe('ContactoTelefonosComponent', () => {
  let component: ContactoTelefonosComponent;
  let fixture: ComponentFixture<ContactoTelefonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoTelefonosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
