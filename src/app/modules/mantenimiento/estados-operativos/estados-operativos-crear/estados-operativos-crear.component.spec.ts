import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosOperativosCrearComponent } from './estados-operativos-crear.component';

describe('EstadosOperativosCrearComponent', () => {
  let component: EstadosOperativosCrearComponent;
  let fixture: ComponentFixture<EstadosOperativosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosOperativosCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosOperativosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
