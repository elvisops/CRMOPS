import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCorreosCrearComponent } from './tipos-correos-crear.component';

describe('TiposCorreosCrearComponent', () => {
  let component: TiposCorreosCrearComponent;
  let fixture: ComponentFixture<TiposCorreosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposCorreosCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposCorreosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
