import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionesEditComponent } from './extensiones-edit.component';

describe('ExtensionesEditComponent', () => {
  let component: ExtensionesEditComponent;
  let fixture: ComponentFixture<ExtensionesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
