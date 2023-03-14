import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposProductosCrearComponent } from './tipos-productos-crear.component';

describe('TiposProductosCrearComponent', () => {
  let component: TiposProductosCrearComponent;
  let fixture: ComponentFixture<TiposProductosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposProductosCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposProductosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
