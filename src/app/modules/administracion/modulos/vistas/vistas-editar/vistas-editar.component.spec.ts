import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistasEditarComponent } from './vistas-editar.component';

describe('VistasEditarComponent', () => {
  let component: VistasEditarComponent;
  let fixture: ComponentFixture<VistasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
