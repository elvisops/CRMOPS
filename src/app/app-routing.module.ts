import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './modules/administracion/login/login.component';
import { PageNotFoundComponent } from './modules/public/page-not-found/page-not-found.component';
import { PerfilUsuarioComponent } from './modules/administracion/perfil-usuario/perfil-usuario.component';
/*import { PageNotFoundComponent } from './modules/public/PageNotFound/page-not-found/page-not-found.component';*/

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {
    path:'login',
    component:LoginComponent
  },  
  {
    path:'inicio', 
    loadChildren:() => 
      import('./modules/public/public.module').then(m=>m.PublicModule),
    canActivate:[AuthGuard]
  },
  { 
    path: 'administracion', 
    loadChildren: () => 
      import('./modules/administracion/administracion.module').then(m => m.AdministracionModule),
    canActivate:[AuthGuard]
  },  
  { 

    path: 'mantenimiento',
    loadChildren: () =>
    import('./modules/mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule),
    canActivate:[AuthGuard]
  },
  { path: 'perfil-usuario', component:PerfilUsuarioComponent},
  {
    path:'**',
    component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
