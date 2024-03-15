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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from 'src/app/modules/administracion/modal-confirmacion/modal-confirmacion.component';

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
    private location: Location,
    // private dialogRef: MatDialogRef<ModalConfirmacionComponent>,
    private dialog: MatDialog,
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
  EncNumerosCuenta: string = ""
  EncIdentidad: string = ""
  EncNombreCliente: string = ""
  EncTelefono: string = ""
  EncDireccion: string = ""
  EncCorreo: string = ""
  EncTelefonoTrabajo: string = ""
  EncabezadosCuentas: any = {
    NumeroCuenta: "",
    Identidad: "",
    NombreCliente: ""
  }

  //variables de control de archivos
  Reader = new FileReader()
  @ViewChild('archivoInput') archivoInput: any;
  Encabezados: any
  EncabezadosOriginales: any

  //HTML Elements
  steps = {
    CreacionCartera: true,
    CargaArchivo: false,
    SeleccionEncabezados: false,
    SeleccionPestanias: false,
    CreacionDB: false,
  }

  //Elementos Creacion de Cartera
  NombreCartera: string = ""
  TipoCarteraID: number = 0

  // selectedOptions: any[] = []
  // arreglo de telefonos
  selectedPhone: string = '';
  selectedPhoneType: string = '';
  tipoDireccionSeleccionado: string = '';
  tipoCorreoSeleccionado: string = '';
  ListaTiposTelefonos: any[] = []
  arregloTelefonos: { telefono: string, tipo: string, tipoLeyenda: string }[] = [];
  arregloDirecciones: { direccion: string, tipo: string, tipoLeyenda: string }[] = [];
  arregloCorreos: { correo: string, tipo: string, tipoLeyenda: string }[] = [];

  ListaTiposDirecciones: any[] = []
  ListaTiposCorreos: any[] = []


  phones: string[] = ['Teléfono 1', 'Teléfono 2', 'Teléfono 3']; // Define tus teléfonos aquí

  ngOnInit(): void {
    this.ObtenerIDProyecto()
    this.ObtenerTiposCarteras()
  }

  GenerarObjetoTelefonos(): void {
    if (this.EncTelefono == '' || this.selectedPhoneType == '') {
      this.service.notificacion('Debe seleccionar el campo que sera utilizado como telefono y su tipo.')
      return
    }

    let tipoTelefonoSeleccionado = this.ListaTiposTelefonos.find(tipo => tipo.TELEFONOTIPOID === this.selectedPhoneType)?.TIPO;

    const selectedObject = {
      telefono: this.EncTelefono,
      tipo: this.selectedPhoneType,
      tipoLeyenda: tipoTelefonoSeleccionado
    };
    this.arregloTelefonos.push(selectedObject);

    this.EncTelefono = ''
    this.selectedPhoneType = ''
  }

  RemoverObjetoTelefonos(): void {
    if (this.EncTelefono == '') {
      this.service.notificacion('Debe seleccionar el campo a remover.')
      return
    }

    const nuevoArreglo = this.arregloTelefonos.filter(obj => obj.telefono !== this.EncTelefono);
    this.arregloTelefonos = []
    this.arregloTelefonos.push(...nuevoArreglo);

    this.EncTelefono = ''
  }


  GenerarObjetoDirecciones(): void {
    if (this.EncDireccion == '' || this.tipoDireccionSeleccionado == '') {
      this.service.notificacion('Debe seleccionar el campo que sera utilizado como dirección y su tipo.')
      return
    }

    let tipoDireccionSeleccionadoLeyenda = this.ListaTiposDirecciones.find(tipo => tipo.TIPODIRECCIONID === this.tipoDireccionSeleccionado)?.TIPODIRECCION;

    const selectedObject = {
      direccion: this.EncDireccion,
      tipo: this.tipoDireccionSeleccionado,
      tipoLeyenda: tipoDireccionSeleccionadoLeyenda
    };
    this.arregloDirecciones.push(selectedObject);

    this.EncDireccion = ''
    this.tipoDireccionSeleccionado = ''
  }

  RemoverObjetoDirecciones(): void {
    if (this.EncDireccion == '') {
      this.service.notificacion('Debe seleccionar el campo a remover.')
      return
    }

    const nuevoArreglo = this.arregloDirecciones.filter(obj => obj.direccion !== this.EncDireccion);
    this.arregloDirecciones = []
    this.arregloDirecciones.push(...nuevoArreglo); 
    this.EncDireccion = ''
  }

  //correos
  GenerarObjetoCorreos(): void {
    if (this.EncCorreo == '' || this.tipoCorreoSeleccionado == '') {
      this.service.notificacion('Debe seleccionar el campo que sera utilizado como correo y su tipo.')
      return
    }

    let tipoCorreoSeleccionadoLeyenda = this.ListaTiposCorreos.find(tipo => tipo.TIPOCORREOID === this.tipoCorreoSeleccionado)?.TIPOCORREO;

    const selectedObject = {
      correo: this.EncCorreo,
      tipo: this.tipoCorreoSeleccionado,
      tipoLeyenda: tipoCorreoSeleccionadoLeyenda
    };
    this.arregloCorreos.push(selectedObject);

    this.EncCorreo = ''
    this.tipoCorreoSeleccionado = ''
  }

  RemoverObjetoCorreos(): void {
    if (this.EncCorreo == '') {
      this.service.notificacion('Debe seleccionar el campo a remover.')
      return
    }

    const nuevoArreglo = this.arregloCorreos.filter(obj => obj.correo !== this.EncCorreo);
    this.arregloCorreos = []
    this.arregloCorreos.push(...nuevoArreglo); 
    this.EncCorreo = ''
  }
  // fin correos

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

    // Obtener los encabezados en mayúsculas
    // this.Encabezados = Object.keys(Obj).map((cadena: string) => cadena.replace(/\s+/g, '').toUpperCase());
    this.Encabezados = Object.keys(Obj).map((cadena: string) => cadena.replace(/[^a-zA-Z0-9]/g, '').toUpperCase());


    this.BitaAgregarRegistro("Encabezados obtenidos correctamente...");
    // console.log(this.Encabezados);

    // Crear un objeto JSON a partir del arreglo de strings
    const objetoJSON: { [key: string]: any } = {};

    this.Encabezados.forEach((cadena: string) => {
      objetoJSON[cadena] = cadena; // Puedes inicializar los valores como desees
    });
    this.EncabezadosOriginales = this.Encabezados
    console.log('encabezados:', this.Encabezados);
    console.log('encabezados originales:', this.EncabezadosOriginales)

  }




  aplicarPalabraPrimer() {
    console.log('primer:', this.EncNumerosCuenta)
    if (this.EncNumeroCuenta == '') {
      this.OpenModelConfirmacion();
    }
    return
    this.Encabezados = this.Encabezados.map((encabezado: any) => {
      const estaSeleccionado = this.EncNumerosCuenta.includes(encabezado);
      return estaSeleccionado ? encabezado + '_PESTANIAUNO' : encabezado;
    });

    // console.log("Encabezados:", this.Encabezados);
    // console.log("Encabezado telefono:",this.EncTelefonoTrabajo)

    // Llamar a la función crearTablaCarteras con los encabezados actualizados
    // this.crearTablaCarteras();
    this.steps.SeleccionPestanias = false;
    this.steps.SeleccionEncabezados = true;

  }

  OpenModelConfirmacion() {
    var msj = ''

    if (this.EncNumerosCuenta == '') {
      msj = '¿Está seguro que no desea agregar datos a la primer pestaña?'
    } else {
      msj = '¿Desea continuar?'
    }

    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '400px',
      data: msj
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.service.notificacion("Seleeciono continuar")
        this.Encabezados = this.Encabezados.map((encabezado: any) => {
          const estaSeleccionado = this.EncNumerosCuenta.includes(encabezado);
          return estaSeleccionado ? encabezado + '_PESTANIAUNO' : encabezado;
        });

        // console.log("Encabezados:", this.Encabezados);
        // console.log("Encabezado telefono:",this.EncTelefonoTrabajo)

        // Llamar a la función crearTablaCarteras con los encabezados actualizados
        // this.crearTablaCarteras();

        this.service.GetTiposTelefonos().subscribe(r => {
          var data = this.auth.desencriptar(r.data)
          this.ListaTiposTelefonos = JSON.parse(data)
          // console.log('lista de telefonos', this.ListaTiposTelefonos)
        })

        this.service.GetTiposDirecciones().subscribe(r => {
          var data = this.auth.desencriptar(r.data)
          this.ListaTiposDirecciones = JSON.parse(data)
          // console.log('lista tipos direcciones: ', this.ListaTiposDirecciones)
        })

        this.service.GetTiposCorreos().subscribe(r => {
          var data = this.auth.desencriptar(r.data)
          this.ListaTiposCorreos = JSON.parse(data)
          console.log('lista de tipos de correos: ',this.ListaTiposCorreos)
        })
        this.steps.SeleccionPestanias = false;
        this.steps.SeleccionEncabezados = true;

      } else {
        // this.service.notificacion("Selecciono no continuar")
        // this.CloseDialog()
      }
    })
  }

  // CloseDialog() {
  //   this.dialogRef.close();
  // }

  // crearTablaCarteras(objetoJSON:any) {
  crearTablaCarteras() {

    // console.log(this.arregloTelefonos)
    if (this.EncNumeroCuenta == "" || this.EncIdentidad == "" || this.EncNombreCliente == "") {
      this.service.notificacion("Los campos con asteriscos son obligatorios")
      return
    }

    if (this.arregloTelefonos.length == 0) {
      this.service.notificacion("Debe agregar al menos un telefono para el cliente")
      return
    }



    // this.service.notificacion("Bien");

    // return

    this.steps.SeleccionEncabezados = false
    this.steps.SeleccionPestanias = false;



    // console.log("Encabezado telefono:",this.EncTelefonoTrabajo)

    // this.insertarDatos('nombreTabla')
    // // console.log("Encabezados:",this.Encabezados)
    // // console.log("id cartera:",this.CarteraID)
    // return
    this.service.crearTabla(this.Encabezados, this.CarteraID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        const nombreTabla = respuesta.data
        console.log('primera parte:', respuesta.data)
        this.insertarDatos(nombreTabla)
      } else {
        this.service.notificacion(respuesta.message)
        // this.insertarDatos('c4020')
      }

    })
    // this.insertarDatos('C6042')

  }


  cambiarEncabezados(datos: any[], encabezadosOriginales: string[], encabezadosNuevos: string[]): any[] {
    const mapeoEncabezados: { [key: string]: string } = {};
    encabezadosOriginales.forEach((encabezadoOriginal, index) => {
      mapeoEncabezados[encabezadoOriginal.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()] = encabezadosNuevos[index];
    });

    return datos.map((registro: any) => {
      const nuevoRegistro: { [key: string]: any } = {};
      for (const clave in registro) {
        if (registro.hasOwnProperty(clave)) {
          const claveNormalizada = clave.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
          const nuevaClave = mapeoEncabezados[claveNormalizada];
          nuevoRegistro[nuevaClave] = registro[clave];
        }
      }
      return nuevoRegistro;
    });
  }



  insertarDatos(nombreTabla: string) {
    // console.log("Encabezados: ",this.Encabezados)  
    //   console.log("Encabezado telefono:",this.EncTelefonoTrabajo)

    // aqui
    this.DatosCartera = this.cambiarEncabezados(this.DatosCartera, this.EncabezadosOriginales, this.Encabezados);
    // console.log("Datos Cartera:", this.DatosCartera)

    // console.log(this.DatosCartera,nombreTabla,this.EncIdentidad,this.EncNombreCliente,this.EncNumeroCuenta,this.EncTelefono,this.EncTelefonoTrabajo);
    // return
    this.service.insertarDatosTabla(this.DatosCartera, nombreTabla, this.EncIdentidad, this.EncNombreCliente, this.EncNumeroCuenta, this.EncTelefono, 
      this.EncTelefonoTrabajo, this.arregloTelefonos, this.arregloDirecciones, this.arregloCorreos).subscribe(r => {
      // var respuesta = this.auth.desencriptar(r)
      var respuesta = (r.respuesta.response)
      respuesta = this.auth.desencriptar(respuesta)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log('segunda parte', respuesta.data)
      console.log('telefono trabajo:', this.EncTelefonoTrabajo)

      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        window.history.back();
      } else {
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
    this.steps.SeleccionPestanias = true;
    this.steps.SeleccionEncabezados = false;
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
