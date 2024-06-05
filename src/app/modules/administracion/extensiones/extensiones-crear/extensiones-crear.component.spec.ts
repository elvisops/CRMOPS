import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionesCrearComponent } from './extensiones-crear.component';

describe('ExtensionesCrearComponent', () => {
  let component: ExtensionesCrearComponent;
  let fixture: ComponentFixture<ExtensionesCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionesCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
