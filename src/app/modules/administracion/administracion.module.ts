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

// Roles
import { RolesComponent } from './roles/roles.component';
import { RolesCrearComponent } from './roles/roles-crear/roles-crear.component'; 
import { RolesEditarComponent } from './roles/roles-editar/roles-editar.component';

import { SociosComponent } from './socios/socios.component';
import { SociosCrearComponent } from './socios/socios-crear/socios-crear.component';
import { SociosEditarComponent } from './socios/socios-editar/socios-editar.component';

import { ProyectosComponent } from './socios/proyectos/proyectos.component';
import { ContactosComponent } from './socios/contactos/contactos.component';

import { ContactoEditarComponent } from './socios/contactos/contacto-editar/contacto-editar.component';
import { ProyectoCrearComponent } from './socios/proyectos/proyecto-crear/proyecto-crear.component';
import { ProyectoEditarComponent } from './socios/proyectos/proyecto-editar/proyecto-editar.component';
import { CarterasComponent } from './socios/proyectos/carteras/carteras.component';
import { CarterasCrearComponent } from './socios/proyectos/carteras/carteras-crear/carteras-crear.component';
import { TiposCarterasComponent } from './socios/proyectos/carteras/tipos-carteras/tipos-carteras.component';
import { VistasComponent } from './modulos/vistas/vistas.component';
import { VistasCrearComponent } from './modulos/vistas/vistas-crear/vistas-crear.component';
import { VistasEditarComponent } from './modulos/vistas/vistas-editar/vistas-editar.component';
import { RolesVistasComponent } from './modulos/vistas/roles-vistas/roles-vistas.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ModalConfirmacionComponent } from './modal-confirmacion/modal-confirmacion.component';
import { ProyectosUsuariosComponent } from './socios/proyectos/proyectos-usuarios/proyectos-usuarios.component';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { ExtensionesCrearComponent } from './extensiones/extensiones-crear/extensiones-crear.component';
import { ExtensionesUsuariosComponent } from './extensiones/extensiones-usuarios/extensiones-usuarios.component';
import { ExtensionesUsuariosCrearComponent } from './extensiones/extensiones-usuarios/extensiones-usuarios-crear/extensiones-usuarios-crear.component';
import { ExtensionesEditComponent } from './extensiones/extensiones-edit/extensiones-edit.component';
import { ExtensionesUsuariosEditComponent } from './extensiones/extensiones-usuarios/extensiones-usuarios-edit/extensiones-usuarios-edit.component';
import { PrefijosComponent } from './socios/proyectos/prefijos/prefijos.component';

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

    RolesComponent,
    RolesCrearComponent,
    RolesEditarComponent,
    SociosComponent,
    SociosCrearComponent,
    SociosEditarComponent,
    ProyectosComponent,
    ContactosComponent,
    ContactoEditarComponent,
    ProyectoCrearComponent,
    ProyectoEditarComponent,
    CarterasComponent,
    CarterasCrearComponent,
    TiposCarterasComponent,
    VistasComponent,
    VistasCrearComponent,
    VistasEditarComponent,
    RolesVistasComponent,
    PerfilUsuarioComponent,
    ModalConfirmacionComponent,
    ProyectosUsuariosComponent,
    ExtensionesComponent,
    ExtensionesCrearComponent,
    ExtensionesUsuariosComponent,
    ExtensionesUsuariosCrearComponent,
    ExtensionesEditComponent,
    ExtensionesUsuariosEditComponent,
    PrefijosComponent,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    MaterialsModule,
  ],
  schemas:[
    
  ]
})
export class AdministracionModule { }

