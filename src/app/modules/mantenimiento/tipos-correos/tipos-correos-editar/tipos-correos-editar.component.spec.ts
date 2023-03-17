import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCorreosEditarComponent } from './tipos-correos-editar.component';

describe('TiposCorreosEditarComponent', () => {
  let component: TiposCorreosEditarComponent;
  let fixture: ComponentFixture<TiposCorreosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposCorreosEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposCorreosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
