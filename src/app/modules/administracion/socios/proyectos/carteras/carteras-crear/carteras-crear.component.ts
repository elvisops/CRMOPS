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
  CarteraID:number = 0//ID de la cartera  
  CarterasTipos:CarterasTipos[] = []//Lista de tipos de carteras
  Bitacora:string = ""//Bitacora de la creacion de la cartera
  BitacoraContador:number = 1//Contador de la bitacora
  Procesando:boolean = false//Variable de control de procesamiento

  CargandoExcel:boolean = false//Variable de control de carga de excel
  DatosCartera:any[] = []//Datos de la cartera

  //variables para encabezados
  EncNumeroCuenta:string = ""
  EncIdentidad:string = ""
  EncNombreCliente:string = ""
  EncabezadosCuentas:any = {
    NumeroCuenta:"",
    Identidad:"",
    NombreCliente:""
  } 


  //variables de control de archivos
  Reader = new FileReader()
  @ViewChild('archivoInput') archivoInput: any;  
  Encabezados:any

  //HTML Elements
  steps = {
    CreacionCartera:true,
    CargaArchivo:false,
    SeleccionEncabezados:false,
    CreacionDB:false,
  }

  //Elementos Creacion de Cartera
  NombreCartera:string=""
  TipoCarteraID:number=0

  ngOnInit(): void {    
    this.ObtenerIDProyecto()     
    this.ObtenerTiposCarteras()
  }

  //Bitacora agregar registro
  BitaAgregarRegistro(msg:string){
    this.Bitacora += `\n ${this.BitacoraContador}.  ${msg}`
    this.BitacoraContador++
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

  //Crear Cartera
  CrearCartera():void{
    this.Procesando = true
    if(this.NombreCartera == "" || this.TipoCarteraID == 0){
      this.service.notificacion("Debe llenar todos los campos")
      return;
    }
    this.service.Create(this.ProyectoID,this.TipoCarteraID,this.NombreCartera).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.CarteraID = respuesta.CarteraID        
        this.steps.CreacionCartera = false
        this.steps.CargaArchivo = true
        this.service.notificacion("La cartera se creo exitosamente!")
        this.BitaAgregarRegistro("Cartera creada correctamente...")                
        
      }else{
        this.service.notificacion(respuesta.message)        
      }
    })
    this.Procesando = false       
    
  }

  //Obtener Encabezados Archivo de Excel
  ObtenerEncabezados(Obj:any){
    this.BitaAgregarRegistro("Obteniendo encabezados del archivo...")    
    this.Encabezados = [...new Set(Object.keys(Obj))]
    this.BitaAgregarRegistro("Encabezados obtenidos correctamente...")
    console.log(this.Encabezados)
  }

  //Cargar Archivo
  async ExcelFile(){
    this.Procesando = true
    this.BitaAgregarRegistro("Leyendo Archivo Excel.. ")
    this.CargandoExcel = true
    const archivo = this.archivoInput.nativeElement.files[0];    
    const fileReader = new FileReader();    

    fileReader.onload = (event:any) => {
      this.BitaAgregarRegistro("Archivo Excel leido correctamente...")
      this.BitaAgregarRegistro("Convirtiendo a JSON...")
      const data = event.target?.result;
      const workbook = XLSX.read(data, {type:'binary'});      
      const NombreHoja = workbook.SheetNames[0];
      const HojaDeTrabajo = workbook.Sheets[NombreHoja];
      this.DatosCartera = XLSX.utils.sheet_to_json(HojaDeTrabajo)      
      this.BitaAgregarRegistro("Archivo Excel convertido a JSON correctamente...")
      this.BitaAgregarRegistro("Total Registros: "+this.DatosCartera.length);
      (this.DatosCartera.length>0)?this.ObtenerEncabezados(this.DatosCartera[0]):this.service.notificacion("El archivo no contiene datos");
      this.CargandoExcel = false 
      // ver todos los datos
      console.log(this.DatosCartera)  
      this.EnviarPaqueteDB(this.DatosCartera)         
    }
    fileReader.readAsBinaryString(archivo);        
    this.Procesando = false
    this.steps.CargaArchivo = false
    this.steps.SeleccionEncabezados = true

    
  }

  //Crear seleccion de campos para numeros de cuentas
  SeleccionEncabezados(){
    if(this.EncNumeroCuenta == "" || this.EncIdentidad == "" || this.EncNombreCliente == ""){
      this.service.notificacion("Debe seleccionar todos los campos")
      return;
    }
    this.EncabezadosCuentas.NumeroCuenta = this.EncNumeroCuenta
    this.EncabezadosCuentas.Identidad = this.EncIdentidad
    this.EncabezadosCuentas.NombreCliente = this.EncNombreCliente        
    console.log(this.EncabezadosCuentas)
  }

  //Envio a base de datos
  async EnviarPaqueteDB(paquete:any){
    //  this.service
    this.service.PaqueteDB(paquete).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
    })
   
  }


  //Regresar a la pagina anterior
  back(){
    this.location.back()    
  }

  showData(){
    console.log(this.DatosCartera)
  }

  
  
}
