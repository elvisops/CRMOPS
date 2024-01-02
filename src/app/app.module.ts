import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Angular Material modules
import { MaterialsModule } from './modules/public/materials/materials.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
// import { ReportesRoutingModule } from './modules/reportes/reportes-routing.module';
//  traducir los datePipe
import {LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es'); //Esto no es un import, pero va justo despues de ellos!

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,             
    MaterialsModule,
    MatBottomSheetModule,
    // ReportesRoutingModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'} // Añades esta línea en los providers
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }