import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
// Component, AfterViewChecked, ElementRef, ViewChild

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { gestionde } from './gestion-de-contactos.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import {
  ControlCambios, Detalles, GestionDeContactos,
  GestionDeContactosConfirmaciones, GestionDeContactosCorreos,
  GestionDeContactosDirecciones, GestionDeContactosHistorial, GestionDeContactosPagos,
  GestionDeContactosPromesas, GestionDeContactosRazonMora, GestionDeContactosTelefonos,
  TipoDeContacto
} from '../gestion-de-contactos/gestion-de-contactos';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
// import { ContactoTelefonosComponent } from './contacto-telefonos/contacto-telefonos.component';
// import { ContactoTelefonoEditarComponent } from './contacto-telefonos/contacto-telefono-editar/contacto-telefono-editar.component';
// import { ContactoDireccionesComponent } from './contacto-direcciones/contacto-direcciones.component';
// import { ContactoDireccionesEditarComponent } from './contacto-direcciones/contacto-direcciones-editar/contacto-direcciones-editar.component';
// import { ContactoCorreosComponent } from './contacto-correos/contacto-correos.component';
// import { ContactoCorreosEditarComponent } from './contacto-correos/contacto-correos-editar/contacto-correos-editar.component';
// import { ContactoConfirmacionesComponent } from './contacto-confirmaciones/contacto-confirmaciones.component';

// validaciones
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, empty, interval } from 'rxjs';
// import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DatePipe } from '@angular/common';
import { GestionDeContactosService } from '../gestion-de-contactos/gestion-de-contactos.service';
import { ContactoConfirmacionesComponent } from '../gestion-de-contactos/contacto-confirmaciones/contacto-confirmaciones.component';
import { ContactoCorreosEditarComponent } from '../gestion-de-contactos/contacto-correos/contacto-correos-editar/contacto-correos-editar.component';
import { ContactoCorreosComponent } from '../gestion-de-contactos/contacto-correos/contacto-correos.component';
import { ContactoDireccionesEditarComponent } from '../gestion-de-contactos/contacto-direcciones/contacto-direcciones-editar/contacto-direcciones-editar.component';
import { ContactoDireccionesComponent } from '../gestion-de-contactos/contacto-direcciones/contacto-direcciones.component';
import { ContactoTelefonoEditarComponent } from '../gestion-de-contactos/contacto-telefonos/contacto-telefono-editar/contacto-telefono-editar.component';
import { ContactoTelefonosComponent } from '../gestion-de-contactos/contacto-telefonos/contacto-telefonos.component';
import { ConfirmationDialogComponent } from '../gestion-de-contactos/confirmation-dialog/confirmation-dialog.component';
import { MatTab } from '@angular/material/tabs';
import { CuentaEditComponent } from '../cuenta-edit/cuenta-edit.component';

@Component({
  selector: 'app-gestion-atencion-cliente',
  templateUrl: './gestion-atencion-cliente.component.html',
  styleUrls: ['./gestion-atencion-cliente.component.css']
})
export class GestionAtencionClienteComponent implements OnInit {

  correoForm = this.formBuilder.group({
    telefonoV: ['', [Validators.required, Validators.min(1)]],
    accionV: ['', [Validators.required, Validators.min(1)]],
    resultadoV: ['', [Validators.required, Validators.min(1)]],
    tipificacionV: ['', [Validators.required, Validators.min(1)]],
    subtipificacionV: ['', [Validators.required, Validators.min(1)]],
    razonMoraV: ['', [Validators.required, Validators.min(1)]],
    fechaPromesaV: ['', [Validators.required]],
    promesaV: ['', [Validators.required, Validators.min(10)]]
  });

  get telefonoControl(): FormControl {
    return this.correoForm.get('telefonoV') as FormControl;
  }
  get accionControl(): FormControl {
    return this.correoForm.get('accionV') as FormControl;
  }
  get resultadoControl(): FormControl {
    return this.correoForm.get('resultadoV') as FormControl;
  }
  get tipificacionControl(): FormControl {
    return this.correoForm.get('tipificacionV') as FormControl;
  }
  get subtipificacionControl(): FormControl {
    return this.correoForm.get('subtipificacionV') as FormControl;
  }
  get razonMoraControl(): FormControl {
    return this.correoForm.get('razonMoraV') as FormControl;
  }
  get fechaPromesaControl(): FormControl {
    return this.correoForm.get('fechaPromesaV') as FormControl;
  }
  get promesaControl(): FormControl {
    return this.correoForm.get('promesaV') as FormControl;
  }

  personaID: number = 0
  nombre: string = ''
  cuentaID: number = 0
  cuenta: string = ''
  cartera: string = ''
  carteraID: number = 0
  saldoDolares: string = ''
  saldoLempiras: string = ''
  tipoCarteraID: number = 0

  // filtro: string = ''

  estadoCivil: number | string = 0;
  ListaEstadoCivil: any[] = [
    { ID: '1', ESTADO: 'Soltero' },
    { ID: '2', ESTADO: 'Casado' },
    { ID: '3', ESTADO: 'Union Libre' },
    { ID: '4', ESTADO: 'Divorsiado' },
  ];
  accionID: number = 0
  ListaAccion: any[] = []
  resultadoID: number = 0
  ListaResultado: any[] = []
  tipificacionID: number = 0
  ListaTipificacion: any[] = []
  subtipificacionID: number = 0
  ListaSubtipificacion: any[] = []

  ListaPlantillas: any[] = []

  observacion: string = ""

  // telefono: number = 0
  telefonoID: number = 0

  telefonoIDSocial: number = 0
  correoIDSocial: number = 0

  plantillaID: number = 0

  fechaPromesa!: Date | null
  valorPromesa: string = ""
  fechaProximaGestion!: Date | null

  razonMoraID: number = 0

  // datos cliente
  ultimaGestion: string = ""
  Agente: string = ""
  ultimoResultado: string = ""
  ultimaAccion: string = ""
  ultimaTipificacion: string = ""
  ultimaSubtipificacion: string = ""
  identificacion: string = ""

  oldEstadoOperativo: number = 0
  estadoOp: number = 0

  llamadaEfectiva: number = 0


  ListaDetalles: Detalles[] = []
  ListaGestiones: GestionDeContactos[] = []
  ListaTelefonos: GestionDeContactosTelefonos[] = []
  ListaDirecciones: GestionDeContactosDirecciones[] = []
  ListaCorreos: GestionDeContactosCorreos[] = []
  ListasPromesas: GestionDeContactosPromesas[] = []
  ListaRazonMora: GestionDeContactosRazonMora[] = []
  OpcionesRazonMora: GestionDeContactosRazonMora[] = []
  ListaPagos: GestionDeContactosPagos[] = []
  ListaConfirmaciones: GestionDeContactosConfirmaciones[] = []

  ListaControlCambios: ControlCambios[] = []


  DataSource: MatTableDataSource<GestionDeContactos> = new MatTableDataSource()

  DataSourceHistorial: MatTableDataSource<GestionDeContactosHistorial> = new MatTableDataSource()
  DataSourceCorreos: MatTableDataSource<GestionDeContactosCorreos> = new MatTableDataSource()
  DataSourcePromesas: MatTableDataSource<GestionDeContactosPromesas> = new MatTableDataSource()
  DataSourceDirecciones: MatTableDataSource<GestionDeContactosDirecciones> = new MatTableDataSource()
  DataSourceTelefonos: MatTableDataSource<GestionDeContactosTelefonos> = new MatTableDataSource()
  DataSourceRazonMora: MatTableDataSource<GestionDeContactosRazonMora> = new MatTableDataSource()

  DataSourcePagos: MatTableDataSource<GestionDeContactosPagos> = new MatTableDataSource()
  DataSourceConfirmaciones: MatTableDataSource<GestionDeContactosConfirmaciones> = new MatTableDataSource()

  DataSoruceControlCambios: MatTableDataSource<ControlCambios> = new MatTableDataSource()

  // const datasourceTel = new MatTableDataSource<GestionDeContactosTelefonos>();
  ColumnasHistorial: string[] = ['ACCION', 'RESULTADO', 'TIPIFICACION', 'SUBTIPIFICACION', 'TELEFONO', 'COMENTARIO', 'CREACION', 'USUARIO', 'TIPO']
  ColumnasTelefonos: string[] = ['TELEFONO', 'TIPO', 'SMS', 'IVR', 'CREACION', 'ACTUALIZACION', 'OPCIONES']
  ColumnasDirecciones: string[] = ['COLONIA', 'DEPARTAMENTO', 'DIRECCION', 'MUNICIPIO', 'TIPODIRECCION', 'CREACION', 'ACTUALIZACION', 'OPCIONES']

  ColumnasCorreos: string[] = ['CORREO', 'TIPOCORREO', 'CREACION', 'ACTUALIZACION', 'OPCIONES', 'ENVIARCORREO']
  ColumnasPromesas: string[] = ['ESTADO', 'MONTO', 'FECHA', 'CREACION']

  ColumnasRazonMora: string[] = ['RAZON', 'CREACION']

  ColumnasPagos: string[] = ['MONTO', 'FECHA']

  ColumnasConfirmaciones: string[] = ['MONTO', 'FECHA', 'USUARIO', 'CREACION']

  ColumnasTelefonosSocial: string[] = ['TELEFONO', 'ENVIARSMS']
  ColumnasCorreosSocial: string[] = ['CORREO', 'ENVIARCORREO']

  ColumnasControlCambios: string[] = ['USUARIO', 'CAMPOMODIFICADO', 'FECHACAMBIO', 'VALORANTERIOR', 'VALORNUEVO']

  // CONTROLCAMBIOSID: number
  // PERSONAID: number
  // USUARIO: string
  // CAMPOMODIFICADO: string
  // FECHACAMBIO: string
  // VALORANTERIOR: string
  // VALORNUEVO: string

  filtro: string = '';

  tablaDetalle: boolean = true
  tablaHistorial: boolean = false
  tablaTelefonos: boolean = false
  tablaDirecciones: boolean = false
  tablaCorreos: boolean = false
  tablaPromesas: boolean = false
  tablaRazonMora: boolean = false
  tablaConfirmaciones: boolean = false
  tablaPagos: boolean = false
  tablaSocial: boolean = false
  tablaWhatsapp: boolean = false
  tablaControlCambios: boolean = false


  divPromesa: boolean = false
  // boton de agregar telefono
  dialogOpen = false;
  selectVisible = false;
  selectDisabled = false;

  chatWhatsapp: any[] = []
  nuevoMensaje: any = ""
  telefono: string[] = []

  //tabla whatsapp
  // chats: any[] = []; // Aquí almacenaremos los chats agrupados por número
  // chatData: { number: string, chats: any[] }[] = []; // Almacenará el número y sus chats
  // uniqueNumbers: string[] = []; // Almacena los números sin repetir
  // chatData: { number: string, chats: any[] }[] = [];
  // selectedNumber: string | null = null;
  uniqueNumbers: string[] = [];
  chatData: { number: string, chats: any[] }[] = [];
  selectedNumber: string | null = null;
  selectedChats: any[] = []; // Variable para almacenar los chats seleccionados
  expandedImage: string | null = null; // Variable para almacenar la URL de la imagen ampliada

  //tiempo de pantalla
  contador: number = 0
  timerSubscription!: Subscription;
  tiempoTranscurridoSegundos: number = 0;
  flagTimer: boolean = false




  @ViewChild('paginatorHistorial') paginatorHistorial!: MatPaginator;
  @ViewChild(MatSort) sortHistorial!: MatSort;


  @ViewChild('paginatorTelefonos') paginatorTelefonos!: MatPaginator;
  @ViewChild(MatSort) sortTelefonos!: MatSort;

  @ViewChild('paginatorDirecciones') paginatorDirecciones!: MatPaginator;
  @ViewChild(MatSort) sortDirecciones!: MatSort;

  @ViewChild('paginatorCorreos') paginatorCorreos!: MatPaginator;
  @ViewChild(MatSort) sortCorreos!: MatSort;

  @ViewChild('paginatorPromesas') paginatorPromesas!: MatPaginator;
  @ViewChild(MatSort) sortPromesas!: MatSort;

  @ViewChild('paginatorRazonMora') paginatorRazonMora!: MatPaginator;
  @ViewChild(MatSort) sortRazonMora!: MatSort;

  @ViewChild('paginatorPagos') paginatorPagos!: MatPaginator;
  @ViewChild(MatSort) sortPagos!: MatSort;

  @ViewChild('paginatorConfirmaciones') paginatorConfirmaciones!: MatPaginator;
  @ViewChild(MatSort) sortConfirmaciones!: MatSort;

  @ViewChild('scrollContainer', { read: ElementRef }) scrollContainerRef!: ElementRef; //para desplazar el scroll hasta abajo en el chat

  @ViewChild('paginatorControlCambios') paginatorControlCambios!: MatPaginator;
  @ViewChild(MatSort) sortControlCambios!: MatSort;
  constructor(
    private service: GestionDeContactosService,
    private auth: AuthService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: Router,
    private datePipe: DatePipe,

  ) { }


  tiempoTranscurrido: string = '';
  private timer: any;
  private ventanaCorreo: Window | null = null;
  private ventanaMensaje: Window | null = null;
  private intervalId: any;

  ngOnInit(): void {

    this.service.savePantalla('Gestion de Cliente').subscribe(r => {

    })

    // this.startTimer1();
    this.router.queryParams.subscribe(params => {
      this.cuentaID = params['cuentaID']
      this.carteraID = params['carteraID']

    })
    // //llamo el proc para traer el tiempo de esta pantall
    // this.genTiempoPantalla()

    // var estadoOperativo = sessionStorage.getItem('EstadoOperativo')
    // var valestadoOperativo = this.auth.desencriptar(estadoOperativo)
    // console.log(estadoOperativo)
    // if (!estadoOperativo || valestadoOperativo == 3) {
    //   // this.startTimer()
    //   this.genTiempoPantalla()

    //   const contadorGuardado = localStorage.getItem('contador');
    //   if (contadorGuardado !== null) {
    //     this.contador = parseInt(contadorGuardado, 10);
    //     // this.startTimer();
    //   }
    // }


    // // console.log(this.carteraID)
    // this.genDatosCliente();

    // // this.intervalId = 
    // setInterval(() => {
    //   if (this.telefonoIDSocial !== 0) {
    //     if (this.telefonoIDSocial !== undefined) {
    //       this.TraerChatWhatsapp(this.telefonoIDSocial);
    //       // alert(this.telefonoIDSocial)
    //     }

    //   }

    // }, 30000);

    var estadoOperativo = sessionStorage.getItem('EstadoOperativo');
    var valestadoOperativo = this.auth.desencriptar(estadoOperativo);
    this.oldEstadoOperativo = valestadoOperativo
    this.estadoOp = valestadoOperativo

    if (!estadoOperativo || valestadoOperativo == 3) {
      this.genTiempoPantalla();
      const contadorGuardado = localStorage.getItem('contadorG');
      if (contadorGuardado !== null) {
        this.contador = parseInt(contadorGuardado, 10);
      }
    }

    // // Intervalo para validar cada segundo
    // interval(1000).subscribe(() => {
    //   var estadoOperativo = sessionStorage.getItem('EstadoOperativo');
    //   var valestadoOperativo = this.auth.desencriptar(estadoOperativo);

    //   this.estadoOp = valestadoOperativo
    //   if ((this.contador === 0 || this.contador === null) && valestadoOperativo == 3) {
    //     // Realizar la acción que necesitas cuando el temporizador está en 0 y valestadoOperativo es igual a 3
    //     console.log('Temporizador en 0 y valestadoOperativo igual a 3');
    //     this.flagTimer = true
    //     this.startTimer()
    //   }
    // });

    //
    // console.log(this.carteraID)
    this.genDatosCliente();

    // this.intervalId = 
    setInterval(() => {
      if (this.telefonoIDSocial !== 0) {
        if (this.telefonoIDSocial !== undefined) {
          this.TraerChatWhatsapp(this.telefonoIDSocial);
          // alert(this.telefonoIDSocial)
        }

      }

    }, 30000);
  }

  // genTiempoPantalla() {
  //   const tiempoAlmacenado = localStorage.getItem('tiempoPantalla');

  //   if (tiempoAlmacenado !== null) {
  //     this.contador = parseInt(tiempoAlmacenado, 10); //de cadena a numero entero
  //     this.startTimer();
  //   } else {
  //     this.service.getTiempoPantalla(this.carteraID, 'GESTION').subscribe(r => {
  //       var respuesta = this.auth.desencriptar(r.data);
  //       respuesta = JSON.parse(respuesta);
  //       console.log(respuesta);

  //       if (respuesta.length > 0 && respuesta[0].TIEMPOSEGUNDOS) {
  //         this.contador = respuesta[0].TIEMPOSEGUNDOS;
  //         localStorage.setItem('tiempoPantalla', this.contador.toString());
  //         this.startTimer();
  //       }
  //     });
  //   }
  // }



  // startTimer() {
  //   this.timerSubscription = interval(1000).subscribe(() => {
  //     if (this.contador > 0) {
  //       this.contador--;
  //       localStorage.setItem('contador', this.contador.toString());
  //       console.log('Tiempo transcurrido:', this.contador);
  //     } else {
  //       this.timerSubscription.unsubscribe();
  //       localStorage.removeItem('contador'); // Elimina el contador del almacenamiento local al finalizar
  //       console.log('Temporizador finalizado');
  //       return
  //       this.service.GuadarGestionATCTimeOut(this.carteraID, this.cuentaID).subscribe(r => {
  //         var respuesta = this.auth.desencriptar(r.response)
  //         respuesta = JSON.parse(respuesta)
  //         console.log(respuesta)
  //       })
  //     }
  //   });
  // }



  // ngOnDestroy() {
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //   }
  //   localStorage.removeItem('tiempoPantalla');
  //   localStorage.removeItem('contador');

  // }


  genTiempoPantalla() {
    const tiempoAlmacenado = localStorage.getItem('tiempoPantallaG');

    // console.log('tiempo almacenado: ',tiempoAlmacenado)
    if (tiempoAlmacenado !== null) {
      this.contador = parseInt(tiempoAlmacenado, 10); //de cadena a numero entero
      this.flagTimer = false
      this.startTimer();
    } else {
      this.service.getTiempoPantalla(this.carteraID, 'GESTION').subscribe(r => {
        var respuesta = this.auth.desencriptar(r.data);
        respuesta = JSON.parse(respuesta);
        // console.log('tiempo en pantalla: ',respuesta);

        if (respuesta.length > 0 && respuesta[0].TIEMPOSEGUNDOS) {
          this.contador = respuesta[0].TIEMPOSEGUNDOS;
          localStorage.setItem('tiempoPantallaG', this.contador.toString());
          this.startTimer();
        }
      });
    }
  }

  startTimer() {
    // this.flagTimer = true
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.contador > 0) {
        this.contador--;
        localStorage.setItem('contadorG', this.contador.toString());
        // console.log('Tiempo transcurrido:', this.contador);
      } else {
        this.timerSubscription.unsubscribe();
        localStorage.removeItem('contadorG'); // Elimina el contador del almacenamiento local al finalizar
        // console.log('Temporizador finalizado');
        window.location.reload()
        // this.service.GuadarGestionATCTimeOut(this.carteraID,this.cuentaID).subscribe(r => {
        //   var respuesta = this.auth.desencriptar(r.response)
        //   respuesta = JSON.parse(respuesta)
        //   console.log(respuesta)
        // })

        // si el estado cambio de cualquier numero a 3 no recargar la pagina y llamar tiempo en pantalla
        // if (this.estadoOp !== this.oldEstadoOperativo) {
          
        // }
        // if (this.oldEstadoOperativo !== this.estadoOp) {
          this.service.GuadarGestionATCTimeOut(this.carteraID, this.cuentaID).subscribe(r => {
            var respuesta = this.auth.desencriptar(r.response)
            respuesta = JSON.parse(respuesta)
            // console.log(respuesta)
          })
        // }
        
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    localStorage.removeItem('tiempoPantalla');
    localStorage.removeItem('contadorG');
    localStorage.removeItem('tiempoPantallaG');

    this.service.removeUserPantalla().subscribe(r => {

    })
  }
  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  startTimer1() {
    const startTime = new Date().getTime();

    this.timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);

      this.tiempoTranscurrido = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    }, 1000);
  }

  formatTime(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }

  genDatosCliente() {
    this.service.getDatosCliente(this.cuentaID, this.carteraID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      // console.log(respuesta)
      this.personaID = respuesta[0].PERSONAID
      this.cuenta = respuesta[0].CUENTA
      this.nombre = respuesta[0].NOMBRE
      this.cartera = respuesta[0].CARTERA
      this.carteraID = respuesta[0].CARTERAID
      // console.log(this.personaID)

      this.ultimaGestion = respuesta[0].CREACION
      this.Agente = respuesta[0].USUARIO
      this.ultimoResultado = respuesta[0].RESULTADO
      this.ultimaAccion = respuesta[0].ACCION
      this.ultimaTipificacion = respuesta[0].TIPIFICACION
      this.ultimaSubtipificacion = respuesta[0].SUBTIPIFICACION
      this.identificacion = respuesta[0].IDENTIFICACION
      this.saldoLempiras = respuesta[0].SALDOLEMPIRAS
      this.saldoDolares = respuesta[0].SALDODOLARES
      this.tipoCarteraID = respuesta[0].TIPOCARTERAID

      this.genListaAcciones();
      this.genListaTipificacion()

      this.genDetalles()
      this.genListaTelefonosSelect()

      this.genOpcionesRazonMora()
    })
  }
  genDetalles() {
    this.service.getDetallesATC(this.cuentaID, this.carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaDetalles = JSON.parse(data)
      // console.log(this.ListaDetalles)
      this.deshabilitarTablas()
      this.tablaDetalle = true
    })
  }

  genListaHistorial() {
    this.service.getListaHistorial(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaGestiones = JSON.parse(data)
      // this.datosFiltrados = this.ListaGestiones
      // console.log(this.ListaGestiones)
      this.deshabilitarTablas()
      this.FillTable<GestionDeContactosHistorial>(this.ListaGestiones, this.DataSourceHistorial, this.sortHistorial, this.paginatorHistorial)
      this.tablaHistorial = true
      // console.log(this.ListaGestiones)
    })
  }

  genListaTelefonosSelect() {
    this.service.getListaTelefonos(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaTelefonos = JSON.parse(data)
      // console.log(this.ListaTelefonos)
      // this.deshabilitarTablas()
      // this.FillTable<GestionDeContactosTelefonos>(this.ListaTelefonos, this.DataSourceTelefonos, this.sortTelefonos, this.paginatorTelefonos);
      // this.tablaTelefonos = true
    })
  }


  genListaTelefonos() {

    // this.genListaTelefonosSelect()
    // console.log(this.ListaTelefonos)
    // this.deshabilitarTablas()
    // this.FillTable<GestionDeContactosTelefonos>(this.ListaTelefonos, this.DataSourceTelefonos, this.sortTelefonos, this.paginatorTelefonos);
    // this.tablaTelefonos = true
    this.service.getListaTelefonos(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaTelefonos = JSON.parse(data)
      // console.log(this.ListaTelefonos)
      this.deshabilitarTablas()
      this.FillTable<GestionDeContactosTelefonos>(this.ListaTelefonos, this.DataSourceTelefonos, this.sortTelefonos, this.paginatorTelefonos);
      this.tablaTelefonos = true
    })
  }

  changeSMS(telefonoID: number, smsValue: boolean | number) {
    // alert(smsValue)

    if (smsValue) {
      smsValue = 1
    } else {
      smsValue = 0
    }

    this.service.updateSMS(telefonoID, smsValue).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  changeIVR(telefonoID: number, ivrValue: boolean | number) {
    // alert(ivrValue)

    if (ivrValue) {
      ivrValue = 1
    } else {
      ivrValue = 0
    }

    this.service.updateIVR(telefonoID, ivrValue).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  genOpcionesRazonMora() {
    this.service.getOpcionesRazonMora(this.carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.OpcionesRazonMora = JSON.parse(data)
      // console.log(this.OpcionesRazonMora)
      // this.deshabilitarTablas()
      // this.FillTable<GestionDeContactosDirecciones>(this.ListaDirecciones, this.DataSourceDirecciones, this.sortDirecciones, this.paginatorDirecciones)
      // this.tablaDirecciones = true
    })
  }



  genListaDirecciones() {
    this.service.getListaDirecciones(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaDirecciones = JSON.parse(data)
      // console.log(this.ListaDirecciones)
      this.deshabilitarTablas()
      this.FillTable<GestionDeContactosDirecciones>(this.ListaDirecciones, this.DataSourceDirecciones, this.sortDirecciones, this.paginatorDirecciones)
      this.tablaDirecciones = true
    })
  }

  genListaCorreos() {
    this.service.getListaCorreos(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaCorreos = JSON.parse(data)
      // console.log(this.ListaCorreos)
      this.deshabilitarTablas()

      this.FillTable<GestionDeContactosCorreos>(this.ListaCorreos, this.DataSourceCorreos, this.sortCorreos, this.paginatorCorreos)
      this.tablaCorreos = true

    })
  }

  genListaPromesas() {
    this.service.getListaPromesas(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListasPromesas = JSON.parse(data)
      // console.log(this.ListasPromesas)
      this.deshabilitarTablas()
      this.FillTable<GestionDeContactosPromesas>(this.ListasPromesas, this.DataSourcePromesas, this.sortPromesas, this.paginatorPromesas)
      this.tablaPromesas = true

    })
  }

  genListaConfirmaciones() {
    this.service.getListaConfirmaciones(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaConfirmaciones = JSON.parse(data)
      // console.log(this.ListaConfirmaciones)
      this.deshabilitarTablas()
      this.FillTable<GestionDeContactosConfirmaciones>(this.ListaConfirmaciones, this.DataSourceConfirmaciones, this.sortConfirmaciones, this.paginatorConfirmaciones)
      this.tablaConfirmaciones = true

    })
  }

  genListaSocial() {
    this.deshabilitarTablas()

    this.service.getListaTelefonos(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaTelefonos = JSON.parse(data)
      // console.log(this.ListaTelefonos)
      // this.deshabilitarTablas()
      this.FillTable<GestionDeContactosTelefonos>(this.ListaTelefonos, this.DataSourceTelefonos, this.sortTelefonos, this.paginatorTelefonos);
      this.tablaSocial = true
    })

    this.service.getListaCorreos(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaCorreos = JSON.parse(data)
      // console.log(this.ListaCorreos)
      // this.deshabilitarTablas()
      this.FillTable<GestionDeContactosCorreos>(this.ListaCorreos, this.DataSourceCorreos, this.sortCorreos, this.paginatorCorreos)
      this.tablaSocial = true
    })

    this.genListaPlantillasSMS()
  }

  dataCliente() {
    this.OpenDialogEditarCliente({ 'IDENTIFICACION': this.identificacion, 'CARTERAID': this.carteraID })
  }

  OpenDialogEditarCliente(cliente: any) {
    const dialogRef = this.dialog.open(CuentaEditComponent, {
      width: '80%',
      data: cliente,
      disableClose: true
    })

  }

  genListaCambios() {
    this.deshabilitarTablas()

    this.service.getListaCambios(this.personaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaControlCambios = JSON.parse(data)
      this.FillTable<ControlCambios>(this.ListaControlCambios, this.DataSoruceControlCambios, this.sortControlCambios, this.paginatorControlCambios)
      this.tablaControlCambios = true
      // console.log(data)
    })
  }

  genListaWhatsapp() {
    this.deshabilitarTablas()
    this.tablaWhatsapp = true

    //tabla whatsapp
    const jsonData = [
      {
        "id": "204250549",
        "number": "50494464871",
        "from": "50495076341",
        "to": "50494464874",
        "type": "IN",
        "text": "Hoy no pude pagar porq no me pagaron pero en cuanto me paguen lo hago",
        "creation_date": "2023-06-01 00:58:59",
        "process_date": "2023-06-01 00:58:59",
        "failed_date": null,
        "custom_data": null
      },
      {
        "id": "204254095",
        "number": "50494464871",
        "from": "50493683443",
        "to": "50494464874",
        "type": "IN",
        "text": "https://fs.magicrepository.com/incoming/e303da3b42dc6c74b9bb4c57801a5a63.jpg",
        "creation_date": "2023-06-01 02:27:22",
        "process_date": "2023-06-01 02:27:22",
        "failed_date": null,
        "custom_data": null
      },
      {
        "id": "204283911",
        "number": "50494464872",
        "from": "50493406925",
        "to": "50494464874",
        "type": "IN",
        "text": "Ok está bien",
        "creation_date": "2023-06-01 10:57:46",
        "process_date": "2023-06-01 10:57:46",
        "failed_date": null,
        "custom_data": null
      },
      {
        "id": "204283923",
        "number": "50494464872",
        "from": "50493406925",
        "to": "50494464874",
        "type": "IN",
        "text": "Ayer fui pero no avía sistema",
        "creation_date": "2023-06-01 10:57:53",
        "process_date": "2023-06-01 10:57:53",
        "failed_date": null,
        "custom_data": null
      },
      {
        "id": "204284138",
        "number": "50494464873",
        "from": "50488206236",
        "to": "50494464874",
        "type": "IN",
        "text": "Buenos días estimado Nelson, \nNo aún no nos han depositado, mi jefe está fuera del país y tuvo problemas ayer nos dijo que hasta hoy",
        "creation_date": "2023-06-01 10:59:48",
        "process_date": "2023-06-01 10:59:48",
        "failed_date": null,
        "custom_data": null
      }
    ];
    //

    // // Crear una estructura de datos para almacenar números únicos y chats
    // const uniqueNumbersSet = new Set<string>();

    // jsonData.forEach(chat => {
    //   const number = chat.number;
    //   uniqueNumbersSet.add(number);

    //   // Agrupar chats por número
    //   let chatGroup = this.chatData.find(group => group.number === number);

    //   if (!chatGroup) {
    //     chatGroup = { number: number, chats: [] };
    //     this.chatData.push(chatGroup);
    //   }

    //   chatGroup.chats.push(chat);
    // });

    // // Convertir el conjunto en una lista de números únicos
    // this.uniqueNumbers = Array.from(uniqueNumbersSet);

    // Crear una estructura de datos para almacenar números únicos y chats
    const uniqueNumbersSet = new Set<string>();

    jsonData.forEach(chat => {
      const number = chat.number;
      uniqueNumbersSet.add(number);

      // Agrupar chats por número
      let chatGroup = this.chatData.find(group => group.number === number);

      if (!chatGroup) {
        chatGroup = { number: number, chats: [] };
        this.chatData.push(chatGroup);
      }

      chatGroup.chats.push(chat);
    });

    // Llenar la lista de números únicos
    this.uniqueNumbers = Array.from(uniqueNumbersSet);
  }

  // selectNumber(number: string) {
  //   this.selectedNumber = number;
  // }

  selectNumber(number: string) {
    this.selectedNumber = number;
    this.selectedChats = this.chatData.find(group => group.number === number)?.chats || [];
  }

  isImageURL(text: string): boolean {
    // Verificar si el texto contiene una URL de imagen
    return text.startsWith('https://fs.magicrepository.com');
  }

  expandImage(imageURL: string) {
    this.expandedImage = imageURL;
  }

  closeExpandedImage() {
    this.expandedImage = null;
  }

  genListaPlantillasSMS() {
    this.service.getListaPlantillasSMS(this.carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaPlantillas = JSON.parse(data)
      // console.log(this.ListaPlantillas)
      // this.deshabilitarTablas()
      // this.FillTable<GestionDeContactosRazonMora>(this.ListaRazonMora, this.DataSourceRazonMora, this.sortRazonMora, this.paginatorRazonMora)
      // this.tablaRazonMora = true
    })
  }

  genListaRazonMora() {
    this.service.getListaRazonMora(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaRazonMora = JSON.parse(data)
      // console.log(this.ListaRazonMora)
      this.deshabilitarTablas()
      this.FillTable<GestionDeContactosRazonMora>(this.ListaRazonMora, this.DataSourceRazonMora, this.sortRazonMora, this.paginatorRazonMora)
      this.tablaRazonMora = true
    })
  }

  genListaPagos() {
    this.service.getListaPagos(this.cuentaID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaPagos = JSON.parse(data)
      // console.log(data)
      this.deshabilitarTablas()
      this.FillTable<GestionDeContactosPagos>(this.ListaPagos, this.DataSourcePagos, this.sortPagos, this.paginatorPagos)
      this.tablaPagos = true
    })
  }

  genListaAcciones() {
    this.service.getListaAcciones(this.carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaAccion = (JSON.parse(data))
      // console.log(this.ListaAccion)
      // this.FillTable(this.ListaAccion)
    })
  }

  genListaTipificacion() {
    this.service.getListaTipificaciones(this.carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaTipificacion = JSON.parse(data)
      // console.log(this.ListaTipificacion)
    })
  }

  // aplicarFiltro() {
  //   if (this.filtro.trim() === '') {
  //     // this.datosFiltrados = this.datosTabla;
  //     this.datosFiltrados = this.ListaGestiones;
  //   } else {
  //     this.datosFiltrados = this.ListaGestiones.filter((dato) =>
  //       Object.values(dato).some((valor) =>
  //         valor.toString().toLowerCase().includes(this.filtro.toLowerCase())
  //       )
  //     );
  //   }
  //   this.paginaActual = 1; // Reiniciar paginación al aplicar el filtro
  // }

  Filtrar(evt: Event, DataSource: any) {
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (DataSource.paginator) {
      DataSource.paginator.firstPage();
    }
  }

  onAccionChange() {
    this.service.getListaResultados(this.accionID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaResultado = JSON.parse(data)
      // console.log(this.ListaResultado)
    })
  }

  onTipificacionChange() {
    this.service.getListaSubTipificaciones(this.tipificacionID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaSubtipificacion = JSON.parse(data)
      // console.log(this.ListaSubtipificacion)
    })


    if (this.tipificacionID === 23) {
      this.divPromesa = true
    } else {
      this.divPromesa = false
    }
  }

  genListaSubTipificaciones() {

  }

  goBack() {
    this.route.navigate(['carteras/cuentas_listas'], { queryParams: { carteraID: this.carteraID, cartera: this.cartera } })
    // window.history.back();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  SaveGestion() {
    // alert(this.llamadaEfectiva)
    if (this.llamadaEfectiva == 0) {
      // this.service.notificacion("Debe seleccionar si la llamada es efectiva o no")
      this.llamadaEfectiva = 3
      // return
    }
    // this.service.notificacion("Bien")
    // alert(this.telefonoID)
    // return
    this.markFormGroupTouched(this.correoForm);
    if (this.telefonoControl.hasError('min') || this.accionControl.hasError('min') || this.resultadoControl.hasError('min') ||
      this.tipificacionControl.hasError('min') || this.subtipificacionControl.hasError('min') || this.razonMoraControl.hasError('min') || this.llamadaEfectiva == 3) {
      this.service.notificacion("Debe llenar los datos solicitados")
      return
    }

    if (this.tipificacionID === 23) {
      if (this.fechaPromesaControl.hasError('required') || this.promesaControl.hasError('required') || this.promesaControl.hasError('min')) {
        this.service.notificacion("Debe llenar los datos de la promesa")
        return
      }
    }

    // alert("bien");
    // return
    // console.log("Llamada efectiva: ",this.llamadaEfectiva)
    this.service.GuadarGestionATC(this.telefonoID, this.cuentaID, this.resultadoID, this.subtipificacionID,this.llamadaEfectiva, this.observacion).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        // if (this.tipificacionID === 23) {
        //   const gestionID = respuesta.data
        //   this.service.GuadarPromesa(gestionID, this.valorPromesa, this.fechaPromesa).subscribe(r => {
        //     var respuestaP = this.auth.desencriptar(r.response)
        //     respuestaP = JSON.parse(respuestaP)
        //     respuestaP = respuestaP[0]
        //     console.log(respuestaP)
        //   })
        // }
        // if (this.fechaProximaGestion !== null) {
        //   this.service.CallBack(this.cuentaID, this.fechaProximaGestion).subscribe(r => {
        //     var respuestaC = this.auth.desencriptar(r.response)
        //     respuestaC = JSON.parse(respuestaC)
        //     respuestaC = respuestaC[0]
        //     console.log(respuestaC)
        //     if (respuestaC.status == 1) {

        //     } else {
        //       this.service.notificacion(respuestaC.message)
        //     }
        //   })
        // }
        this.service.notificacion(respuesta.message)
        this.limpiarCampos()
        this.genDatosCliente()

      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  confirmarSiguiente() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: '¿Desea continuar con el siguiente contacto?'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.siguiente()
      } else {

      }
    })
  }

  siguiente() {
    this.service.SiguienteContacto().subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.route.navigate(['carteras/cuenta_create'], { queryParams: { carteraID: this.carteraID, TipoCarteraID: this.tipoCarteraID } })
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        this.service.notificacion(respuesta.message)
        this.route.navigate(['carteras/cuenta_create'], { queryParams: { carteraID: this.carteraID, TipoCarteraID: this.tipoCarteraID } })

      }
      // console.log(respuesta)

    })
  }

  getFechaMinima(): Date {
    return new Date(); // Devuelve la fecha actual
  }

  getFechaMaxima(): Date {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 14);
    return fechaActual;
  }

  limpiarCampos() {
    this.accionID = 0
    this.resultadoID = 0
    this.tipificacionID = 0
    this.subtipificacionID = 0
    this.divPromesa = false
    this.valorPromesa = ""
    this.razonMoraID = 0
    this.fechaProximaGestion = null
    this.fechaPromesa = null
    this.telefonoID = 0
    this.observacion = ""
    this.telefonoIDSocial = 0
    this.correoIDSocial = 0
    // this.razonMoraID = 0
  }

  // FillTable<T extends TipoDeContacto>(Datos: T[], DataSource: MatTableDataSource<T>, sort: MatSort, paginator: MatPaginator) {
  FillTable<T>(Datos: T[], DataSource: MatTableDataSource<T>, sort: MatSort, paginator: MatPaginator) {
    DataSource.data = Datos;
    DataSource.sort = sort;
    DataSource.paginator = paginator;
  }

  deshabilitarTablas() {
    this.tablaDetalle = false
    this.tablaHistorial = false
    this.tablaPromesas = false
    this.tablaTelefonos = false
    this.tablaDirecciones = false
    this.tablaCorreos = false
    this.tablaRazonMora = false
    this.tablaConfirmaciones = false
    this.tablaPagos = false

    this.tablaSocial = false
    this.tablaWhatsapp = false

    this.tablaControlCambios = false

    // this.filtro = ''
  }

  OpenDialogTelefonos() {
    this.selectDisabled = true;
    const dialogRef = this.dialog.open(ContactoTelefonosComponent, {
      width: '50%',
      data: this.personaID,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(datos => {
      this.genListaTelefonos()
      this.selectVisible = true;
      this.selectDisabled = false;
    })
  }

  OpenDialogEditar(Cliente: any) {
    const dialogRef = this.dialog.open(ContactoTelefonoEditarComponent, {
      width: '50%',
      data: Cliente
    });
    dialogRef.afterClosed().subscribe(datos => {
      this.genListaTelefonos()
    })
  }

  OpenDialogDirecciones() {
    const dialogRef = this.dialog.open(ContactoDireccionesComponent, {
      width: '50%',
      data: this.personaID,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(datos => {
      this.genListaDirecciones()
    })
  }

  OpenDialogEditarDireccion(Cliente: any) {
    const dialogRef = this.dialog.open(ContactoDireccionesEditarComponent, {
      width: '50%',
      data: Cliente,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(datos => {
      this.genListaDirecciones()
    })
  }

  OpenDialogCorreos() {
    const dialogRef = this.dialog.open(ContactoCorreosComponent, {
      width: '50%',
      data: this.personaID,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(datos => {
      this.genListaCorreos()
    })
  }

  // OpenDialogEditarCorreo
  OpenDialogEditarCorreo(Cliente: any) {
    const dialogRef = this.dialog.open(ContactoCorreosEditarComponent, {
      width: '50%',
      data: Cliente,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(datos => {
      this.genListaCorreos()
    })
  }

  EnviarCorreo(Correo: any) {
    if (Correo == 0) {
      this.service.notificacion("Debe seleccionar un correo electronico")
      return
    }

    // console.log(this.ListaTelefonos)

    let mail = ""

    for (let jsonData of this.ListaCorreos) {
      if (jsonData.CORREOID === Correo) {
        mail = jsonData.CORREO
        break;
      }
    }
    const url = `http://10.8.8.115/medios-alternos/enviar/1/14/1998/100/${mail}`;

    if (this.ventanaCorreo === null || this.ventanaCorreo.closed) {
      this.ventanaCorreo = window.open(url, '_blank');
    } else {
      this.ventanaCorreo.location.href = url;
      this.ventanaCorreo.focus();
    }
  }

  EnviarSMS(Cliente: any) {
    if (Cliente == 0 || this.plantillaID == 0) {
      this.service.notificacion("Debe seleccionar un telefono y la plantilla para enviar el sms")
      return
    }

    // console.log(this.ListaTelefonos)

    let telefono = ""
    for (let jsonData of this.ListaTelefonos) {
      if (jsonData.TELEFONOID === Cliente) {
        telefono = jsonData.TELEFONO
        break;
      }
    }

    let mensaje = ""
    for (let jsonData of this.ListaPlantillas) {
      if (jsonData.PLANTILLAID === this.plantillaID) {
        mensaje = jsonData.MENSAJE
        break;
      }
    }

    // alert(plantilla)

    const url = `https://ec.tigobusiness.hn/api/http/send_to_contact?msisdn=504${telefono}&message=${mensaje}&id=100&api_key=RJEb1GMh9djAG8scTVZ38jUkbOwqVcGs&detail=1`;
    if (this.ventanaMensaje === null || this.ventanaMensaje.closed) {
      this.ventanaMensaje = window.open(url, '_blank');
    } else {
      this.ventanaMensaje.location.href = url;
      this.ventanaMensaje.focus();
    }
  }

  OpenDialogConfirmaciones() {
    const dialogRef = this.dialog.open(ContactoConfirmacionesComponent, {
      width: '50%',
      data: this.cuentaID,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(datos => {
      this.genListaConfirmaciones()
    })
  }

  TraerChatWhatsapp(telefonoID: number) {
    // alert(telefonoID)
    // const resultados = this.ListaTelefonos.filter(registro.TELEFONO => registro.TELEFONOID === 8);
    this.telefonoID = telefonoID
    this.telefono = this.ListaTelefonos
      .filter(registro => registro.TELEFONOID === telefonoID)
      .map(registro => registro.TELEFONO);
    // alert(telefono)

    this.service.traerChatWhat(this.telefono).subscribe(r => {
      this.chatWhatsapp = r
      // console.log(r)
    })
  }

  enviarMensaje() {
    this.service.enviarMensajeWhat(this.telefono, this.nuevoMensaje).subscribe(r => {
      // alert(this.telefonoID)
      this.TraerChatWhatsapp(this.telefonoID);
      this.nuevoMensaje = ""
    })
    // if (this.nuevoMensaje.trim() !== '') {
    //   this.chatWhatsapp.push({ text: this.nuevoMensaje, process_date: new Date(), type: 'OUT' });
    //   this.nuevoMensaje = ''; // Limpiar el campo de entrada
    // }
  }

  scrollToBottom(): void {
    if (this.scrollContainerRef && this.scrollContainerRef.nativeElement) {
      const scrollContainer = this.scrollContainerRef.nativeElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
}
