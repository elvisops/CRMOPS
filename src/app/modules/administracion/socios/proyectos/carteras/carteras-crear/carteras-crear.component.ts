import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { CarterasTipos } from '../carteras';
import { CarterasService } from '../carteras.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { concatMap, from } from 'rxjs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-carteras-crear',
  templateUrl: './carteras-crear.component.html',
  styleUrls: ['./carteras-crear.component.css']
})
export class CarterasCrearComponent implements OnInit {

  constructor(
    private FormBuilder:FormBuilder,
    private service: CarterasService,
    private auth:AuthService,
    private ActivatedRoute:ActivatedRoute,
    private router:Router,
    private location:Location
  ){}
  
  //Variables Globales
  ProyectoID:number=0//ID del proyecto al que pertenecera la cartera
  NombreCartera:string = ''//Nombre de la cartera
  CarteraID:number = 0//ID de la cartera
  TipoCarteraID:number = 0//ID del tipo de cartera
  CarterasTipos:CarterasTipos[] = []//Lista de tipos de carteras

  //variables de control de archivos
  Reader = new FileReader()
  @ViewChild('archivoInput') archivoInput: any;
  jsonData:any
  Encabezados:string[] = []


  ngOnInit(): void {    
    this.ObtenerIDProyecto()     
    this.ObtenerTiposCarteras()
  }

  //obtener el ID de proyecto
  ObtenerIDProyecto(){
    var RouteID = this.ActivatedRoute.snapshot.params['id'];
    RouteID = this.auth.mkurl_dec(RouteID.toString())
    this.ProyectoID = RouteID
  }

  //Obtener Tipos de Carteras
  ObtenerTiposCarteras(){
    this.service.getCarterasTipos().subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.CarterasTipos = respuesta
    })
  }

  back(){
    this.location.back()    
  }


  
}
