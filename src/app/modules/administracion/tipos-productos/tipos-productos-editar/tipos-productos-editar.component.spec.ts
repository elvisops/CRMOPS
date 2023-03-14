import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposProductosEditarComponent } from './tipos-productos-editar.component';

describe('TiposProductosEditarComponent', () => {
  let component: TiposProductosEditarComponent;
  let fixture: ComponentFixture<TiposProductosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposProductosEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposProductosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
