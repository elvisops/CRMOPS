import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministracionComponent } from './administracion.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialsModule } from '../public/materials/materials.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTreeModule} from '@angular/material/tree';

import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AdministracionComponent,
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,    
    FormsModule, 
    ReactiveFormsModule,    
    MatCardModule,
    MatFormFieldModule,
    MatInputModule   
   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdministracionModule { }
