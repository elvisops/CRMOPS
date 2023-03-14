import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosCrearComponent } from './socios-crear.component';

describe('SociosCrearComponent', () => {
  let component: SociosCrearComponent;
  let fixture: ComponentFixture<SociosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SociosCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
