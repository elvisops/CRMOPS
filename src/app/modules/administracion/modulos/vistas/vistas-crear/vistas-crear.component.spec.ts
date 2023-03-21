import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistasCrearComponent } from './vistas-crear.component';

describe('VistasCrearComponent', () => {
  let component: VistasCrearComponent;
  let fixture: ComponentFixture<VistasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistasCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
