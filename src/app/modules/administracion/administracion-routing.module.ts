import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { PanelInicioComponent } from './panel-inicio/panel-inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModulosComponent } from './modulos/modulos.component';

import { RolesComponent } from './roles/roles.component';

import { SociosComponent } from './socios/socios.component';
import { TiposCorreosComponent } from './tipos-correos/tipos-correos.component';
import { ProyectosComponent } from './socios/proyectos/proyectos.component';


const routes: Routes = [
  { path: '', component: AdministracionComponent },
  { path: 'panel-inicio', component:PanelInicioComponent, },
  { path: 'usuarios',component:UsuariosComponent},
  { path: 'modulos',component:ModulosComponent},

  { path: 'roles',component:RolesComponent},

  { path: 'socios',component:SociosComponent},
  {path:'socios/proyectos/:id',component:ProyectosComponent},  
  { path: 'tipos_correos',component:TiposCorreosComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})
export class AdministracionRoutingModule { }
