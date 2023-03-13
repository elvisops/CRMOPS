import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCorreosComponent } from './tipos-correos.component';

describe('TiposCorreosComponent', () => {
  let component: TiposCorreosComponent;
  let fixture: ComponentFixture<TiposCorreosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposCorreosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposCorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
