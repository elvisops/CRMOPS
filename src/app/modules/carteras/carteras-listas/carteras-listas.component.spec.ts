import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarterasListasComponent } from './carteras-listas.component';

describe('CarterasListasComponent', () => {
  let component: CarterasListasComponent;
  let fixture: ComponentFixture<CarterasListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarterasListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarterasListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
