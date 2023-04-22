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
import { PaisesComponent } from '../administracion/paises/paises.component';
import { TiposProductosComponent } from '../administracion/tipos-productos/tipos-productos.component';
import { PaisesEditarComponent } from '../administracion/paises/paises-editar/paises-editar.component';
import { TiposProductosCrearComponent } from '../administracion/tipos-productos/tipos-productos-crear/tipos-productos-crear.component';
import { TiposProductosEditarComponent } from '../administracion/tipos-productos/tipos-productos-editar/tipos-productos-editar.component';
import { PaisesCrearComponent } from '../administracion/paises/paises-crear/paises-crear.component';
import { TiposDireccionesComponent } from './tipos-direcciones/tipos-direcciones.component';
import { TiposDireccionesCrearComponent } from './tipos-direcciones/tipos-direcciones-crear/tipos-direcciones-crear.component';
import { TiposDireccionesEditarComponent } from './tipos-direcciones/tipos-direcciones-editar/tipos-direcciones-editar.component';
import { EstadosOperativosComponent } from './estados-operativos/estados-operativos.component';
import { EstadosOperativosCrearComponent } from './estados-operativos/estados-operativos-crear/estados-operativos-crear.component';
import { EstadosOperativosEditarComponent } from './estados-operativos/estados-operativos-editar/estados-operativos-editar.component';

@NgModule({
  declarations: [
    MantenimientoComponent,
    TiposCorreosComponent,
    TiposCorreosCrearComponent,
    TiposCorreosEditarComponent,
    TiposTelefonosComponent,
    TiposTelefonosCrearComponent,
    TiposTelefonosEditarComponent,
    PaisesComponent,PaisesEditarComponent,PaisesCrearComponent,
    TiposProductosComponent,TiposProductosCrearComponent,TiposProductosEditarComponent,
    TiposDireccionesComponent,
    TiposDireccionesCrearComponent,
    TiposDireccionesEditarComponent,
    EstadosOperativosComponent,
    EstadosOperativosCrearComponent,
    EstadosOperativosEditarComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    MaterialsModule
  ]
})
export class MantenimientoModule { }
