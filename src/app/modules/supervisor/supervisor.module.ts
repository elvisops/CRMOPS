import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorComponent } from './supervisor.component';
import { ColasTrabajoComponent } from './colas-trabajo/colas-trabajo.component';
import { MaterialsModule } from '../public/materials/materials.module';

@NgModule({
  declarations: [
    SupervisorComponent,
    ColasTrabajoComponent
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    MaterialsModule
  ]
})
export class SupervisorModule { }
