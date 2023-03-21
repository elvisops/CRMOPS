import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';
import { TiposCorreosComponent } from './tipos-correos/tipos-correos.component';
import { TiposCorreosCrearComponent } from './tipos-correos/tipos-correos-crear/tipos-correos-crear.component';
import { TiposCorreosEditarComponent } from './tipos-correos/tipos-correos-editar/tipos-correos-editar.component';
import { TiposTelefonosComponent } from './tipos-telefonos/tipos-telefonos.component';
import { PaisesComponent } from '../administracion/paises/paises.component';
import { TiposProductosComponent } from '../administracion/tipos-productos/tipos-productos.component';
import { TiposDireccionesComponent } from './tipos-direcciones/tipos-direcciones.component';

const routes: Routes = [
    { path: '', component:MantenimientoComponent},
    { path: 'tipos_correos',component:TiposCorreosComponent},
    { path:'tipos_correos/tipos-correos-crear', component:TiposCorreosCrearComponent},
    { path:'tipos_correos/tipos-correos-editar', component:TiposCorreosEditarComponent},    
    { path:'paises',component:PaisesComponent},
    { path:'tipos_productos',component:TiposProductosComponent},
    { path: 'tipos_telefonos', component:TiposTelefonosComponent},
    { path: 'tipos_direcciones', component:TiposDireccionesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
