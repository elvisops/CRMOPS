import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoCorreosEditarComponent } from './contacto-correos-editar.component';

describe('ContactoCorreosEditarComponent', () => {
  let component: ContactoCorreosEditarComponent;
  let fixture: ComponentFixture<ContactoCorreosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoCorreosEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoCorreosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
