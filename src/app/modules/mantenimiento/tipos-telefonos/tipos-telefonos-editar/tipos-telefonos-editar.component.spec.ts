import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposTelefonosEditarComponent } from './tipos-telefonos-editar.component';

describe('TiposTelefonosEditarComponent', () => {
  let component: TiposTelefonosEditarComponent;
  let fixture: ComponentFixture<TiposTelefonosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposTelefonosEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposTelefonosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
