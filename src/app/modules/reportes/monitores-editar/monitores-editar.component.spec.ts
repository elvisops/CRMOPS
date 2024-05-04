import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoresEditarComponent } from './monitores-editar.component';

describe('MonitoresEditarComponent', () => {
  let component: MonitoresEditarComponent;
  let fixture: ComponentFixture<MonitoresEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoresEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoresEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
