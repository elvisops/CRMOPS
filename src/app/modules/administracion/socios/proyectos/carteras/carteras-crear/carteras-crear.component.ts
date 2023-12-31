import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private FormBuilder: FormBuilder,
    private service: CarterasService,
    private auth: AuthService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  //Variables Globales
  ProyectoID: number = 0//ID del proyecto al que pertenecera la cartera  
  CarteraID: number = 0//ID de la cartera  
  CarterasTipos: CarterasTipos[] = []//Lista de tipos de carteras
  Bitacora: string = ""//Bitacora de la creacion de la cartera
  BitacoraContador: number = 1//Contador de la bitacora
  Procesando: boolean = false//Variable de control de procesamiento

  CargandoExcel: boolean = false//Variable de control de carga de excel
  DatosCartera: any[] = []//Datos de la cartera

  //variables para encabezados
  EncNumeroCuenta: string = ""
  EncIdentidad: string = ""
  EncNombreCliente: string = ""
  EncTelefono: string = ""
  EncabezadosCuentas: any = {
    NumeroCuenta: "",
    Identidad: "",
    NombreCliente: ""
  }

  //variables de control de archivos
  Reader = new FileReader()
  @ViewChild('archivoInput') archivoInput: any;
  Encabezados: any

  //HTML Elements
  steps = {
    CreacionCartera: true,
    CargaArchivo: false,
    SeleccionEncabezados: false,
    CreacionDB: false,
  }

  //Elementos Creacion de Cartera
  NombreCartera: string = ""
  TipoCarteraID: number = 0

  ngOnInit(): void {
    this.ObtenerIDProyecto()
    this.ObtenerTiposCarteras()
  }

  //Bitacora agregar registro
  BitaAgregarRegistro(msg: string) {
    this.Bitacora += `\n ${this.BitacoraContador}.  ${msg}`
    this.BitacoraContador++
  }

  //obtener el ID de proyecto
  ObtenerIDProyecto() {
    var RouteID = this.ActivatedRoute.snapshot.params['id'];
    RouteID = this.auth.mkurl_dec(RouteID.toString())
    this.ProyectoID = RouteID
  }

  //Obtener Tipos de Carteras
  ObtenerTiposCarteras() {
    this.service.getCarterasTipos().subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.CarterasTipos = respuesta
    })
  }

  //Crear Cartera
  CrearCartera(): void {
    this.Procesando = true
    if (this.NombreCartera == "" || this.TipoCarteraID == 0) {
      this.service.notificacion("Debe llenar todos los campos")
      return;
    }
    this.service.Create(this.ProyectoID, this.TipoCarteraID, this.NombreCartera).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.CarteraID = respuesta.data
        // console.log(this.CarteraID)
        this.steps.CreacionCartera = false
        this.steps.CargaArchivo = true //true
        this.service.notificacion("La cartera se creo exitosamente!")
        this.BitaAgregarRegistro("Cartera creada correctamente...")

      } else {
        this.service.notificacion(respuesta.message)
      }
    })
    this.Procesando = false

  }

  // //Obtener Encabezados Archivo de Excel
  // ObtenerEncabezados(Obj: any) {
  //   this.BitaAgregarRegistro("Obteniendo encabezados del archivo...")
  //   this.Encabezados = [...new Set(Object.keys(Obj))]
  //   this.BitaAgregarRegistro("Encabezados obtenidos correctamente...")
  //   console.log(this.Encabezados)

  //   // Crear un objeto JSON a partir del arreglo de strings
  //   const objetoJSON: { [key: string]: any } = {};

  //   this.Encabezados.forEach((cadena: any) => {
  //     objetoJSON[cadena] = cadena; // Puedes inicializar los valores como desees
  //   });
  // }


  // Obtener Encabezados Archivo de Excel
ObtenerEncabezados(Obj: any) {
  this.BitaAgregarRegistro("Obteniendo encabezados del archivo...");

  // Obtener los encabezados en mayúsculas y sin espacios
  this.Encabezados = Object.keys(Obj).map((cadena: string) => cadena.replace(/\s+/g, '').toUpperCase());

  this.BitaAgregarRegistro("Encabezados obtenidos correctamente...");
  console.log(this.Encabezados);

  // Crear un objeto JSON a partir del arreglo de strings
  const objetoJSON: { [key: string]: any } = {};

  this.Encabezados.forEach((cadena: string) => {
    objetoJSON[cadena] = cadena; // Puedes inicializar los valores como desees
  });
}

  

  
  // crearTablaCarteras(objetoJSON:any) {
  crearTablaCarteras() {
    this.service.crearTabla(this.Encabezados, this.CarteraID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        const nombreTabla = respuesta.data
        this.insertarDatos(nombreTabla)
      }else{
        this.service.notificacion(respuesta.message)
        // this.insertarDatos('c4020')
      }

    })
    // this.insertarDatos('C6042')

  }

  insertarDatos(nombreTabla:string){
    
    console.log(this.DatosCartera,nombreTabla)
    this.service.insertarDatosTabla(this.DatosCartera,nombreTabla,this.EncIdentidad,this.EncNombreCliente,this.EncNumeroCuenta,this.EncTelefono).subscribe(r => {
      // var respuesta = this.auth.desencriptar(r)
      var respuesta = (r.respuesta.response)
      respuesta = this.auth.desencriptar(respuesta)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]

      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
      }else{
        this.service.notificacion(respuesta.message)
      }
      // console.log(respuesta[0].status)
    })
  }

  // //Cargar Archivo
  // async ExcelFile() {
  //   this.Procesando = true
  //   this.BitaAgregarRegistro("Leyendo Archivo Excel.. ")
  //   this.CargandoExcel = true
  //   const archivo = this.archivoInput.nativeElement.files[0];
  //   const fileReader = new FileReader();

  //   fileReader.onload = (event: any) => {
  //     this.BitaAgregarRegistro("Archivo Excel leido correctamente...")
  //     this.BitaAgregarRegistro("Convirtiendo a JSON...")
  //     const data = event.target?.result;
  //     const workbook = XLSX.read(data, { type: 'binary' });
  //     const NombreHoja = workbook.SheetNames[0];
  //     const HojaDeTrabajo = workbook.Sheets[NombreHoja];
  //     this.DatosCartera = XLSX.utils.sheet_to_json(HojaDeTrabajo)
  //     this.BitaAgregarRegistro("Archivo Excel convertido a JSON correctamente...")
  //     this.BitaAgregarRegistro("Total Registros: " + this.DatosCartera.length);
  //     (this.DatosCartera.length > 0) ? this.ObtenerEncabezados(this.DatosCartera[0]) : this.service.notificacion("El archivo no contiene datos");
  //     this.CargandoExcel = false

  //     console.log(this.DatosCartera)
   
  //   }
  //   fileReader.readAsBinaryString(archivo);
  //   this.Procesando = false
  //   this.steps.CargaArchivo = false
  //   this.steps.SeleccionEncabezados = true
  // }

  // Cargar Archivo
async ExcelFile() {
  this.Procesando = true;
  this.BitaAgregarRegistro("Leyendo Archivo Excel.. ");
  this.CargandoExcel = true;
  const archivo = this.archivoInput.nativeElement.files[0];
  const fileReader = new FileReader();

  fileReader.onload = (event: any) => {
    this.BitaAgregarRegistro("Archivo Excel leído correctamente...");
    this.BitaAgregarRegistro("Convirtiendo a JSON...");
    const data = event.target?.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    const NombreHoja = workbook.SheetNames[0];
    const HojaDeTrabajo = workbook.Sheets[NombreHoja];
    this.DatosCartera = XLSX.utils.sheet_to_json(HojaDeTrabajo);

    // Transformar las claves del objeto DatosCartera
    this.DatosCartera = this.DatosCartera.map((registro: any) => {
      const nuevoRegistro: { [key: string]: any } = {};
      for (const clave in registro) {
        if (registro.hasOwnProperty(clave)) {
          const nuevaClave = clave.replace(/\s+/g, '').toUpperCase();
          nuevoRegistro[nuevaClave] = registro[clave];
        }
      }
      return nuevoRegistro;
    });

    this.BitaAgregarRegistro("Archivo Excel convertido a JSON correctamente...");
    this.BitaAgregarRegistro("Total Registros: " + this.DatosCartera.length);
    (this.DatosCartera.length > 0) ? this.ObtenerEncabezados(this.DatosCartera[0]) : this.service.notificacion("El archivo no contiene datos");
    this.CargandoExcel = false;

    // console.log(this.DatosCartera);
  };

  fileReader.readAsBinaryString(archivo);
  this.Procesando = false;
  this.steps.CargaArchivo = false;
  this.steps.SeleccionEncabezados = true;
}


  //Crear seleccion de campos para numeros de cuentas
  SeleccionEncabezados() {
    if (this.EncNumeroCuenta == "" || this.EncIdentidad == "" || this.EncNombreCliente == "") {
      this.service.notificacion("Debe seleccionar todos los campos")
      return;
    }
    this.EncabezadosCuentas.NumeroCuenta = this.EncNumeroCuenta
    this.EncabezadosCuentas.Identidad = this.EncIdentidad
    this.EncabezadosCuentas.NombreCliente = this.EncNombreCliente
    // console.log(this.EncabezadosCuentas)
  }

  //Envio a base de datos
  async EnviarPaqueteDB(paquete: any) {
    //  this.service
    this.service.PaqueteDB(paquete).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      // console.log(respuesta)
    })

  }


  //Regresar a la pagina anterior
  back() {
    this.location.back()
  }

  showData() {
    console.log(this.DatosCartera)
  }



}
