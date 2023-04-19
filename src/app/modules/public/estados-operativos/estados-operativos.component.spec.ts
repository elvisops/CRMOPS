import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosOperativosComponent } from './estados-operativos.component';

describe('EstadosOperativosComponent', () => {
  let component: EstadosOperativosComponent;
  let fixture: ComponentFixture<EstadosOperativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosOperativosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosOperativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
