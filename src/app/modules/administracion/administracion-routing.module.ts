import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { AdministracionComponent } from './administracion.component';
import { PanelInicioComponent } from './panel-inicio/panel-inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: AdministracionComponent },
  { path: 'panel-inicio', component:PanelInicioComponent, },
  { path: 'usuarios',component:UsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})
export class AdministracionRoutingModule { }
