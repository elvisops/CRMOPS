import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { LoginComponent } from './login/login.component';
import { MaterialsModule } from '../public/materials/materials.module';

@NgModule({
  declarations: [
    AdministracionComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    MaterialsModule
  ]
})
export class AdministracionModule { }
