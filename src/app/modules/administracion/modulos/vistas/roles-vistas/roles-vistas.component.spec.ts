import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesVistasComponent } from './roles-vistas.component';

describe('RolesVistasComponent', () => {
  let component: RolesVistasComponent;
  let fixture: ComponentFixture<RolesVistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesVistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesVistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
