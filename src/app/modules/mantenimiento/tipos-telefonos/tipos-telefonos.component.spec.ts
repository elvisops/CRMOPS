import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposTelefonosComponent } from './tipos-telefonos.component';

describe('TiposTelefonosComponent', () => {
  let component: TiposTelefonosComponent;
  let fixture: ComponentFixture<TiposTelefonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposTelefonosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
