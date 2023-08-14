import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColasTrabajoComponent } from './colas-trabajo/colas-trabajo.component';
import { SupervisorComponent } from './supervisor.component';

const routes: Routes = [
  { path:'', component:SupervisorComponent},
  { path:'colas_de_trabajo', component:ColasTrabajoComponent}
]


@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
