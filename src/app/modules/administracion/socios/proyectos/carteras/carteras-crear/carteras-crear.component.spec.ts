import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarterasCrearComponent } from './carteras-crear.component';

describe('CarterasCrearComponent', () => {
  let component: CarterasCrearComponent;
  let fixture: ComponentFixture<CarterasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarterasCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarterasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
