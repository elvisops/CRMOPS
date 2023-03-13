import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosEditarComponent } from './socios-editar.component';

describe('SociosEditarComponent', () => {
  let component: SociosEditarComponent;
  let fixture: ComponentFixture<SociosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SociosEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
