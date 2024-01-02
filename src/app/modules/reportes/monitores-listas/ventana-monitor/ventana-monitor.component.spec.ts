import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaMonitorComponent } from './ventana-monitor.component';

describe('VentanaMonitorComponent', () => {
  let component: VentanaMonitorComponent;
  let fixture: ComponentFixture<VentanaMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
