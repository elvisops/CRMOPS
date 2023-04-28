import { Component, OnInit, ViewChild } from '@angular/core';
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

  Reader = new FileReader()

  @ViewChild('archivoInput') archivoInput: any;
  jsonData:any
  Encabezados:string[] = []

  constructor(
    private FormBuilder:FormBuilder,
    private service: CarterasService,
    private auth:AuthService,
    private ActivatedRoute:ActivatedRoute,
    private router:Router
  ){}
  
  Proyecto:any
  ListaCarterasTipos:CarterasTipos[] = []
  StepOneCompleted:boolean = false
  


  //Step 2
  LoadingFile:boolean = false  
  LoadingProcess:boolean = false
  FileLoaded:boolean = false
  CargandoCuentas:boolean = false
  

  //Arreglos sin duplicados para crear registros en la base de datos
  ArrIdentidadesNombres:string[] = []
  ArrCuentas:string[] = []    
  //Cambiar a fromgroup
  EncCuenta:string = ""
  EncIdentidad:string=""
  EncNombre:string = ""

  //arreglo a enviar a la api y base de datos
  CuentasIdentidades:any[] = [[]]

  firstFormGroup: FormGroup = this.FormBuilder.group(
    {
      NombreCartera: ['',Validators.required],
      TipoCartera: ['',Validators.required]
    }
  );
  secondFormGroup: FormGroup = this.FormBuilder.group({secondCtrl: ['']});

  ngOnInit(): void {
    var RouteData = this.ActivatedRoute.snapshot.params['proyectoid']
    console.log(RouteData)
    RouteData = this.auth.mkurl_dec(RouteData.toString())
    RouteData = JSON.parse(RouteData)
    this.Proyecto = RouteData
    this.ObtenerTiposCarteras()
    

  }
  

  ObtenerTiposCarteras(){
    this.service.getCarterasTipos().subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.ListaCarterasTipos = respuesta
    })
  }

  CrearCartera(){
    var NombreCartera = this.firstFormGroup.get('NombreCartera')?.value
    var TipoCarteraID = this.firstFormGroup.get('TipoCartera')?.value
    var ProyectoID = this.Proyecto    
    console.log(ProyectoID)

    this.service.Create(ProyectoID,TipoCarteraID,NombreCartera).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.StepOneCompleted = true
        this.service.notificacion("Cartera registrada con exito")
      }else{
        this.service.notificacion(respuesta.messsage)
        this.StepOneCompleted = false
        return;
      }
    })    
  }

  convertirExcelToJson(){
    this.LoadingFile = true
    const archivo = this.archivoInput.nativeElement.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.jsonData = XLSX.utils.sheet_to_json(worksheet);
      //console.log(this.jsonData); 
      this.getEncabezados(this.jsonData);
      //console.log(this.Encabezados)
      this.LoadingFile = false
    };
    reader.readAsBinaryString(archivo);
    
  };

  getEncabezados(Obj:any){
    var arrTemp = []    
    for(var obj1 of Obj){
      const objKeys = Object.keys(obj1);
      arrTemp.push(...objKeys)
    }
    this.Encabezados = [...new Set(arrTemp)]
  }

  RemoveEnc(enc:string){
    console.log(enc)
    let nombre = this.Encabezados.indexOf(enc)
    console.log(nombre)
    if(nombre != -1){
      this.Encabezados.splice(nombre, 1);
    }
  }

  async GenerarArreglosCarga(){

    this.CargandoCuentas = true

    if(this.EncCuenta == "" || this.EncIdentidad == "" || this.EncNombre == ""){
      this.service.notificacion("Los campos obligatorios no pueden estar vacios")
      return
    }

    var paquete:any = []
    this.jsonData.map((cuenta:any)=>{
      paquete.push({
        CARTERAID:1,
        CUENTA:cuenta[this.EncCuenta], 
        IDENTIDAD:cuenta[this.EncIdentidad], 
        NOMBRE:cuenta[this.EncNombre]
      })
    })
     this.service.SendDataCuenta(paquete).subscribe((r:any)=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.service.notificacion("Cuentas registradas con exito")
      }else{
        this.service.notificacion(respuesta.messsage)
        return;
      }      
    })    
  }   

  
}
