import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeContactosComponent } from './gestion-de-contactos.component';

describe('GestionDeContactosComponent', () => {
  let component: GestionDeContactosComponent;
  let fixture: ComponentFixture<GestionDeContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDeContactosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDeContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
