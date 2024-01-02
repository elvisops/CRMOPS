import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CarterasRoutingModule } from './carteras-routing.module';
import { CarterasComponent } from './carteras.component';

import { CarterasListasComponent } from './carteras-listas/carteras-listas.component';
import { GestionDeContactosComponent } from './gestion-de-contactos/gestion-de-contactos.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MaterialsModule } from '../public/materials/materials.module';
import { CuentasListasComponent } from './cuentas-listas/cuentas-listas.component';
import { ContactoTelefonosComponent } from './gestion-de-contactos/contacto-telefonos/contacto-telefonos.component';
import { ContactoTelefonoEditarComponent } from './gestion-de-contactos/contacto-telefonos/contacto-telefono-editar/contacto-telefono-editar.component';
import { ContactoDireccionesComponent } from './gestion-de-contactos/contacto-direcciones/contacto-direcciones.component';
import { ContactoDireccionesEditarComponent } from './gestion-de-contactos/contacto-direcciones/contacto-direcciones-editar/contacto-direcciones-editar.component';
import { ContactoCorreosComponent } from './gestion-de-contactos/contacto-correos/contacto-correos.component';
import { ContactoCorreosEditarComponent } from './gestion-de-contactos/contacto-correos/contacto-correos-editar/contacto-correos-editar.component';
import { ContactoConfirmacionesComponent } from './gestion-de-contactos/contacto-confirmaciones/contacto-confirmaciones.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { ConfirmationDialogComponent } from './gestion-de-contactos/confirmation-dialog/confirmation-dialog.component';
import { GestionAtencionClienteComponent } from './gestion-atencion-cliente/gestion-atencion-cliente.component';
import { CuentaCreateComponent } from './cuenta-create/cuenta-create.component';
import { CuentaEditComponent } from './cuenta-edit/cuenta-edit.component';


@NgModule({
  declarations: [
    CarterasComponent,
    CarterasListasComponent,
    GestionDeContactosComponent,
    CuentasListasComponent,
    ContactoTelefonosComponent,
    ContactoTelefonoEditarComponent,
    ContactoDireccionesComponent,
    ContactoDireccionesEditarComponent,
    ContactoCorreosComponent,
    ContactoCorreosEditarComponent,
    ContactoConfirmacionesComponent,
    ConfirmationDialogComponent,
    GestionAtencionClienteComponent,
    CuentaCreateComponent,
    CuentaEditComponent,
  ],
  imports: [
    CommonModule,
    CarterasRoutingModule,
    PaginationModule,
    MaterialsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,

    
  ],
  providers:[ DatePipe],
  schemas:[
    
  ]
})
export class CarterasModule { }
