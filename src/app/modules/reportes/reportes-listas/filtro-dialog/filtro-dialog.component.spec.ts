import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDialogComponent } from './filtro-dialog.component';

describe('FiltroDialogComponent', () => {
  let component: FiltroDialogComponent;
  let fixture: ComponentFixture<FiltroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
