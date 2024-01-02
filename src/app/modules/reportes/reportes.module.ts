import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { MaterialsModule } from '../public/materials/materials.module';
import { ReportesListasComponent } from './reportes-listas/reportes-listas.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { FiltroDialogComponent } from './reportes-listas/filtro-dialog/filtro-dialog.component';
import { MonitoresListasComponent } from './monitores-listas/monitores-listas.component';
import { VentanaMonitorComponent } from './monitores-listas/ventana-monitor/ventana-monitor.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    ReportesComponent,
    ReportesListasComponent,
    FiltroDialogComponent,
    MonitoresListasComponent,
    VentanaMonitorComponent

  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MaterialsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxChartsModule
  ],
  providers:[DatePipe]
})
export class ReportesModule { }
