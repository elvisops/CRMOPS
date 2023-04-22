import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosOperativosEditarComponent } from './estados-operativos-editar.component';

describe('EstadosOperativosEditarComponent', () => {
  let component: EstadosOperativosEditarComponent;
  let fixture: ComponentFixture<EstadosOperativosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosOperativosEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosOperativosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
