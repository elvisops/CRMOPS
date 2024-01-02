import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAtencionClienteComponent } from './gestion-atencion-cliente.component';

describe('GestionAtencionClienteComponent', () => {
  let component: GestionAtencionClienteComponent;
  let fixture: ComponentFixture<GestionAtencionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAtencionClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAtencionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
