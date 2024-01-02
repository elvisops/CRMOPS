import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoPantallaComponent } from './tiempo-pantalla.component';

describe('TiempoPantallaComponent', () => {
  let component: TiempoPantallaComponent;
  let fixture: ComponentFixture<TiempoPantallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiempoPantallaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiempoPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
