import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoRoutingModule } from './mantenimiento-routing-module';
import { MantenimientoComponent } from './mantenimiento.component';
import { MaterialsModule } from '../public/materials/materials.module';



@NgModule({
  declarations: [
    MantenimientoComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    MaterialsModule
  ]
})
export class MantenimientoModule { }
