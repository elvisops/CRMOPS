import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { LoginComponent } from './login/login.component';
import { MaterialsModule } from '../public/materials/materials.module';
import { PanelInicioComponent } from './panel-inicio/panel-inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosCrearComponent } from './usuarios/usuarios-crear/usuarios-crear.component';
import { UsuariosEditarComponent } from './usuarios/usuarios-editar/usuarios-editar.component';
import { ModulosComponent } from './modulos/modulos.component';
import { ModulosCrearComponent } from './modulos/modulos-crear/modulos-crear.component';
import { ModulosEditarComponent } from './modulos/modulos-editar/modulos-editar.component';
import { SociosComponent } from './socios/socios.component';
import { SociosCrearComponent } from './socios/socios-crear/socios-crear.component';
import { SociosEditarComponent } from './socios/socios-editar/socios-editar.component';
import { TiposCorreosComponent } from './tipos-correos/tipos-correos.component';
import { ProyectosComponent } from './socios/proyectos/proyectos.component';
import { ContactosComponent } from './socios/contactos/contactos.component';

@NgModule({
  declarations: [
    AdministracionComponent,
    LoginComponent,
    PanelInicioComponent,
    UsuariosComponent,
    UsuariosCrearComponent,
    UsuariosEditarComponent,
    ModulosComponent,
    ModulosCrearComponent,
    ModulosEditarComponent,
    SociosComponent,
    SociosCrearComponent,
    SociosEditarComponent,
    TiposCorreosComponent,
    ProyectosComponent,
    ContactosComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    MaterialsModule
  ],
  schemas:[
    
  ]
})
export class AdministracionModule { }
