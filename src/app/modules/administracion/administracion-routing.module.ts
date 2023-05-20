import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { PanelInicioComponent } from './panel-inicio/panel-inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModulosComponent } from './modulos/modulos.component';

import { RolesComponent } from './roles/roles.component';

import { SociosComponent } from './socios/socios.component';
import { ProyectosComponent } from './socios/proyectos/proyectos.component';
import { CarterasComponent } from './socios/proyectos/carteras/carteras.component';
import { CarterasCrearComponent } from './socios/proyectos/carteras/carteras-crear/carteras-crear.component';
import { MantenimientoComponent } from '../mantenimiento/mantenimiento.component';
import { VistasComponent } from './modulos/vistas/vistas.component';


const routes: Routes = [
  { path: '', component: AdministracionComponent },
  { path: 'panel-inicio', component:PanelInicioComponent, },
  { path: 'usuarios',component:UsuariosComponent },
  { path: 'modulos',component:ModulosComponent },
  { path: 'modulos/vistas/:id', component:VistasComponent },

  { path: 'roles',component:RolesComponent },
  { path: 'socios',component:SociosComponent },  
  { path:'socios/proyectos/:id',component:ProyectosComponent },  
  { path: 'socios/carteras/:proyectoid',component:CarterasComponent },
  { path: 'socios/crear-cartera/:id',component:CarterasCrearComponent },
  { path: 'mantenimiento', component:MantenimientoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})
export class AdministracionRoutingModule { }
