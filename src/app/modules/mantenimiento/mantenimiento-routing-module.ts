import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { TiposCorreosComponent } from './tipos-correos/tipos-correos.component';
// import { TiposCorreosCrearComponent } from './tipos-correos/tipos-correos-crear/tipos-correos-crear.component';
// import { TiposCorreosEditarComponent } from './tipos-correos/tipos-correos-editar/tipos-correos-editar.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { TiposCorreosComponent } from './tipos-correos/tipos-correos.component';
import { TiposCorreosCrearComponent } from './tipos-correos/tipos-correos-crear/tipos-correos-crear.component';
import { TiposCorreosEditarComponent } from './tipos-correos/tipos-correos-editar/tipos-correos-editar.component';
import { TiposTelefonosComponent } from './tipos-telefonos/tipos-telefonos.component';

const routes: Routes = [
    { path: '', component:MantenimientoComponent},
    { path: 'tipos_correos',component:TiposCorreosComponent},
    { path:'tipos_correos/tipos-correos-crear', component:TiposCorreosCrearComponent},
    { path:'tipos_correos/tipos-correos-editar', component:TiposCorreosEditarComponent},
    { path: 'tipos_telefonos', component:TiposTelefonosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
