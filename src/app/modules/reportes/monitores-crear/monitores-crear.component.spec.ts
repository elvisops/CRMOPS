import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoresCrearComponent } from './monitores-crear.component';

describe('MonitoresCrearComponent', () => {
  let component: MonitoresCrearComponent;
  let fixture: ComponentFixture<MonitoresCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoresCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoresCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
