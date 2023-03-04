import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { LoginComponent } from './login/login.component';
import { MaterialsModule } from '../public/materials/materials.module';
import { PanelInicioComponent } from './panel-inicio/panel-inicio.component';

@NgModule({
  declarations: [
    AdministracionComponent,
    LoginComponent,
    PanelInicioComponent
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
