import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionesUsuariosComponent } from './extensiones-usuarios.component';

describe('ExtensionesUsuariosComponent', () => {
  let component: ExtensionesUsuariosComponent;
  let fixture: ComponentFixture<ExtensionesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionesUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
