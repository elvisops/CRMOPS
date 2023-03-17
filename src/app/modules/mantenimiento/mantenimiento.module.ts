import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoRoutingModule } from './mantenimiento-routing-module';
import { MantenimientoComponent } from './mantenimiento.component';
import { TiposCorreosComponent } from './tipos-correos/tipos-correos.component';
import { TiposCorreosCrearComponent } from './tipos-correos/tipos-correos-crear/tipos-correos-crear.component';
import { TiposCorreosEditarComponent } from './tipos-correos/tipos-correos-editar/tipos-correos-editar.component';
import { MaterialsModule } from '../public/materials/materials.module';
import { TiposTelefonosComponent } from './tipos-telefonos/tipos-telefonos.component';
import { TiposTelefonosCrearComponent } from './tipos-telefonos/tipos-telefonos-crear/tipos-telefonos-crear.component';
import { TiposTelefonosEditarComponent } from './tipos-telefonos/tipos-telefonos-editar/tipos-telefonos-editar.component';

@NgModule({
  declarations: [
    MantenimientoComponent,
    TiposCorreosComponent,
    TiposCorreosCrearComponent,
    TiposCorreosEditarComponent,
    TiposTelefonosComponent,
    TiposTelefonosCrearComponent,
    TiposTelefonosEditarComponent

  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    MaterialsModule
  ]
})
export class MantenimientoModule { }
