import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposTelefonosCrearComponent } from './tipos-telefonos-crear.component';

describe('TiposTelefonosCrearComponent', () => {
  let component: TiposTelefonosCrearComponent;
  let fixture: ComponentFixture<TiposTelefonosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposTelefonosCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposTelefonosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
