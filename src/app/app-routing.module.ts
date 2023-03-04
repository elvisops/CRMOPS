import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/administracion/login/login.component';
import { PageNotFoundComponent } from './modules/public/page-not-found/page-not-found.component';
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
      import('./modules/public/public.module').then(m=>m.PublicModule)
  },
  { 
    path: 'administracion', 
    loadChildren: () => 
      import('./modules/administracion/administracion.module').then(m => m.AdministracionModule) 
  },  
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
