import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { ReportesListasComponent } from './reportes-listas/reportes-listas.component';
import { MonitoresListasComponent } from './monitores-listas/monitores-listas.component';
import { VentanaMonitorComponent } from './monitores-listas/ventana-monitor/ventana-monitor.component';
import { ReportesEditarComponent } from './reportes-editar/reportes-editar.component';
import { ReportesCrearComponent } from './reportes-crear/reportes-crear.component';
import { MonitoresEditarComponent } from './monitores-editar/monitores-editar.component';
import { MonitoresCrearComponent } from './monitores-crear/monitores-crear.component';

const routes: Routes = [
  { path:'', component: ReportesComponent},
  { path:'reportes_listas', component:ReportesListasComponent},
  { path:'monitores_listas',component:MonitoresListasComponent},
  {path: 'monitores_edit', component: MonitoresEditarComponent},
  { path: 'monitores_create', component: MonitoresCrearComponent},
  { path:'ventana_monitor',component:VentanaMonitorComponent},
  { path:'reportes_edit',component:ReportesEditarComponent },
  { path: 'reportes_create',component: ReportesCrearComponent},
  { path: 'reportes_listas:carteraid', component: ReportesListasComponent}
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
