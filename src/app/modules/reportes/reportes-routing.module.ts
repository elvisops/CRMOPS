import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { ReportesListasComponent } from './reportes-listas/reportes-listas.component';
import { MonitoresListasComponent } from './monitores-listas/monitores-listas.component';
import { VentanaMonitorComponent } from './monitores-listas/ventana-monitor/ventana-monitor.component';

const routes: Routes = [
  { path:'', component: ReportesComponent},
  { path:'reportes_listas', component:ReportesListasComponent},
  { path:'monitores_listas',component:MonitoresListasComponent},
  { path:'ventana_monitor',component:VentanaMonitorComponent}
]

@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
