import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosUsuarioComponent } from './proyectos-usuario.component';

describe('ProyectosUsuarioComponent', () => {
  let component: ProyectosUsuarioComponent;
  let fixture: ComponentFixture<ProyectosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
