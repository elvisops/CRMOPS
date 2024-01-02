import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoresListasComponent } from './monitores-listas.component';

describe('MonitoresListasComponent', () => {
  let component: MonitoresListasComponent;
  let fixture: ComponentFixture<MonitoresListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoresListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoresListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
