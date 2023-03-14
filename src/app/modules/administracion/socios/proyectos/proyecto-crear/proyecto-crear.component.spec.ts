import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoCrearComponent } from './proyecto-crear.component';

describe('ProyectoCrearComponent', () => {
  let component: ProyectoCrearComponent;
  let fixture: ComponentFixture<ProyectoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
