import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Angular Material
import { MaterialsModule } from './materials/materials.module';
import { EstadosOperativosComponent } from './estados-operativos/estados-operativos.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [
    PublicComponent,
    PageNotFoundComponent,
    EstadosOperativosComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NgbModule,  
    MaterialsModule,
    MatBottomSheetModule
  ],
  exports:[
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicModule { }
