import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosUsuariosComponent } from './proyectos-usuarios.component';

describe('ProyectosUsuariosComponent', () => {
  let component: ProyectosUsuariosComponent;
  let fixture: ComponentFixture<ProyectosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
