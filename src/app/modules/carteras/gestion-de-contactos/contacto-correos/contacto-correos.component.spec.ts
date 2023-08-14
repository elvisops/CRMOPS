import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoCorreosComponent } from './contacto-correos.component';

describe('ContactoCorreosComponent', () => {
  let component: ContactoCorreosComponent;
  let fixture: ComponentFixture<ContactoCorreosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoCorreosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoCorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
