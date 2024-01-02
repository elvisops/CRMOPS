import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
// import { CarterasComponent } from './carteras.component';
import { CarterasComponent } from './carteras.component';
import { CarterasListasComponent } from './carteras-listas/carteras-listas.component';
import { GestionDeContactosComponent } from './gestion-de-contactos/gestion-de-contactos.component';
import { CuentasListasComponent } from './cuentas-listas/cuentas-listas.component';
import { GestionAtencionClienteComponent } from './gestion-atencion-cliente/gestion-atencion-cliente.component';
import { CuentaCreateComponent } from './cuenta-create/cuenta-create.component';

const routes:Routes = [
  { path:'', component :CarterasComponent},
  { path:'carteras_listas', component: CarterasListasComponent},
  { path:'gestion_de_contactos', component: GestionDeContactosComponent},
  { path:'cuentas_listas', component: CuentasListasComponent},
  { path:'carteras_cuentas', component:GestionDeContactosComponent},
  //atencion al cliente Cuentas
  { path:'atencion_cliente', component:GestionAtencionClienteComponent},
  { path:'cuenta_create', component: CuentaCreateComponent}

]

@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarterasRoutingModule { }
