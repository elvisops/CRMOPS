import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { AdministracionComponent } from './administracion.component';
import { PanelInicioComponent } from './panel-inicio/panel-inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModulosComponent } from './modulos/modulos.component';
import { SociosComponent } from './socios/socios.component';
import { TiposCorreosComponent } from './tipos-correos/tipos-correos.component';
import { PaisesComponent } from './paises/paises.component';
import { TiposProductosComponent } from './tipos-productos/tipos-productos.component';

const routes: Routes = [
  { path: '', component: AdministracionComponent },
  { path: 'panel-inicio', component:PanelInicioComponent, },
  { path: 'usuarios',component:UsuariosComponent},
  { path: 'modulos',component:ModulosComponent},
  { path: 'socios',component:SociosComponent},
  { path: 'tipos_correos',component:TiposCorreosComponent},
  { path: 'paises',component:PaisesComponent},
  { path: 'tipos_productos',component:TiposProductosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})
export class AdministracionRoutingModule { }
