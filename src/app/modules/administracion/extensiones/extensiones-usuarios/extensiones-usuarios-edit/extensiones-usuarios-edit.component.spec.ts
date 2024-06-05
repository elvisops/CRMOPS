import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionesUsuariosEditComponent } from './extensiones-usuarios-edit.component';

describe('ExtensionesUsuariosEditComponent', () => {
  let component: ExtensionesUsuariosEditComponent;
  let fixture: ComponentFixture<ExtensionesUsuariosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionesUsuariosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionesUsuariosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
