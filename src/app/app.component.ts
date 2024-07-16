import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './guards/auth/auth.service';
import { LoginService } from './modules/administracion/login/login.service';
import { TimerServiceService } from './timer-service.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { EstadosOperativosComponent } from './modules/public/estados-operativos/estados-operativos.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from './modules/public/chat/chat.component';
import { ChatService } from './modules/public/chat/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'CRM OPS';
  isLogged: boolean = false
  username: string = ""
  status: string = ""
  permisos: any = []
  modulos: any = []

  elapsedTime?: number;
  tiempo: string = ""
  estadoOperativoID: number = 1
  carteraId: number = 1

  messages: string = "";



  not: string = ''
  // get datos() {

  //   if (this.datosService.datos == "1") {
  //     this.notificacion = "0"
  //   }


  //   return this.datosService.datos
  // }


  constructor(
    private LoginService: LoginService,
    private auth: AuthService,
    private timerService: TimerServiceService,
    private timer: TimerServiceService,
    private service: AuthService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private router: Router,

    private datosService: ChatService
  ) {

    var val = localStorage.getItem('notificacion')

    if (val == undefined || val == null || val == '') {
      this.notificacion = ""
      // console.log("validar sesion")
    }

    // console.log(this.datos)
    this.ValidarSesion()
    // if (this.not == "1") {
    //   console.log("ya no existen notificaciones")
    // }else{

    //   console.log("existen notificaciones")
    // }
    // this.notificacion = localStorage.getItem('notificacion')

  }


  notificacion: string | null = localStorage.getItem('notificacion')


  msj: string = "";

  recibirMensaje(mensajes: any) {
    this.msj = mensajes;
    // console.log(this.msj)
  }

  AbrirChat(): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '1000px',
      data: ''
    })
  }

  AbrirEstados(): void {
    this.bottomSheet.open(EstadosOperativosComponent)
  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: BeforeUnloadEvent) {
  //   // Mostrar un mensaje de confirmación al usuario
  //   const confirmationMessage = '¿Seguro que quieres salir?';
  //   event.returnValue = confirmationMessage; // Para compatibilidad con navegadores antiguos

  //   // Realizar la solicitud HTTP antes de que la página se descargue
  //   const usuarioID = sessionStorage.getItem('usuarioID');
  //   if (usuarioID) {
  //     const desencriptado = this.service.desencriptar(usuarioID);
  //     this.timerService.actualizarEstadoOperativo(desencriptado)
  //       .subscribe(
  //         () => {
  //           console.log('Solicitud HTTP enviada correctamente antes de cerrar la página.');
  //         },
  //         error => {
  //           console.error('Error al enviar la solicitud HTTP:', error);
  //         }
  //       );
  //   }
  // }

  // private ventanaCerrandose: boolean = false;

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: BeforeUnloadEvent) {
  //   // Establecer la bandera para indicar que la ventana se está cerrando
  //   this.ventanaCerrandose = true;
  // }

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event: Event) {
  //   // Verificar si la ventana realmente se está cerrando
  //   if (this.ventanaCerrandose) {
  //     // Realizar la solicitud HTTP antes de que la página se descargue
  //     const usuarioID = sessionStorage.getItem('usuarioID');
  //     if (usuarioID) {
  //       const desencriptado = this.service.desencriptar(usuarioID);
  //       this.timerService.actualizarEstadoOperativo(desencriptado)
  //         .subscribe(
  //           () => {
  //             console.log('Solicitud HTTP enviada correctamente antes de cerrar la página.');
  //           },
  //           error => {
  //             console.error('Error al enviar la solicitud HTTP:', error);
  //           }
  //         );
  //     }
  //   }
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // onWindowClose(event: any): void {
  //   // Do something

  //   // this.timerService.actualizarEstadoOperativo('4').subscribe(r => {
  //   //   var res = this.auth.desencriptar(r.data)
  //   //   console.log(res)
  //   // })
  //   // debugger;

  //   //  event.preventDefault();
  //   //  event.returnValue = false;

  //   // debugger; 

  //   // window.addEventListener('beforeunload', () => {
  //   //   console.log('cerrando pestaña del navegador')
  //   //   // const desencriptado = this.service.desencriptar(usuarioID);
  //   //   // this.timerService.actualizarEstadoOperativo(desencriptado)

  //   //   debugger;
  //   //   event.preventDefault();
  //   //   event.returnValue = false;

  //   //   // window.open("https://ionicframework.com/", '_blank')
  //   // })

  // }

  // @HostListener('window:beforeunload', ['$event'])
  // onWindowClose(event: any): void {
  //   if (event.currentTarget.performance.navigation.type === 1) {
  //     // Aquí colocas lo que deseas hacer solo cuando se está cerrando la ventana o el navegador
  //     // Por ejemplo:

  //     event.preventDefault();
  //     event.returnValue = false;

  //     console.log("La ventana se está cerrando o el navegador está siendo cerrado");
  //   }
  // }


  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: BeforeUnloadEvent) {
  //     // Aquí colocas lo que deseas hacer cuando se cierra la ventana o pestaña
  //     // event.preventDefault();
  //     event.returnValue = false;
  //     // console.log('La ventana del navegador se está cerrando o la pestaña se está cerrando.');
  // }


  // enviarSolicitudAlCerrarVentana() {
  //   // Detectar el evento unload
  //   window.addEventListener('unload', () => {
  //     // Realizar la solicitud HTTP al servidor
  //     // const usuarioID = sessionStorage.getItem('usuarioID');
  //     const usuarioID = this.service.encriptar("4")
  //     if (usuarioID) {
  //       const desencriptado = this.service.desencriptar(usuarioID);
  //       this.timerService.actualizarEstadoOperativo(desencriptado).subscribe(
  //           () => {
  //             console.log('Solicitud HTTP enviada correctamente al cerrar la ventana.');
  //           },
  //           error => {
  //             console.error('Error al enviar la solicitud HTTP al cerrar la ventana:', error);
  //           }
  //         );
  //     }
  //   });
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: BeforeUnloadEvent) {
  //   localStorage.setItem('reloading', 'true'); // Establecer indicador de recarga
  // }

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event: Event) {
  //   if (localStorage.getItem('reloading') !== 'true') {
  //     // Realizar la solicitud HTTP solo si la página se está cerrando definitivamente
  //     const usuarioID = sessionStorage.getItem('usuarioID');
  //     if (usuarioID) {
  //       const desencriptado = this.service.desencriptar(usuarioID);
  //       this.timerService.actualizarEstadoOperativo(desencriptado)
  //         .subscribe(
  //           () => {
  //             console.log('Solicitud HTTP enviada correctamente antes de cerrar la página.');
  //           },
  //           error => {
  //             console.error('Error al enviar la solicitud HTTP:', error);
  //           }
  //         );
  //     }
  //   }
  //   localStorage.removeItem('reloading'); // Eliminar indicador de recarga
  // }

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event: Event) {
  //   if (localStorage.getItem('reloading') !== 'true') {
  //     // Realizar la solicitud HTTP solo si la página se está cerrando definitivamente
  //     const usuarioID = sessionStorage.getItem('usuarioID');
  //     if (usuarioID) {
  //       const desencriptado = this.service.desencriptar(usuarioID);
  //       this.timerService.actualizarEstadoOperativo(desencriptado)
  //         .subscribe(
  //           () => {
  //             console.log('Solicitud HTTP enviada correctamente antes de cerrar la página.');
  //           },
  //           error => {
  //             console.error('Error al enviar la solicitud HTTP:', error);
  //           }
  //         );
  //     }
  //   }
  //   localStorage.removeItem('reloading'); // Eliminar indicador de recarga
  // }


  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.newValue == 'token' || event.key == 'token') {
      this.ValidarSesion()

    }
  }

  // @HostListener('window:unload', [ '$event' ])
  // unloadHandler(event) {
  //   localStorage.clear();

  // }

  ngOnInit(): void {
    this.ValidarSesion()
    this.username = sessionStorage.getItem('usuario') || ""
    this.status = "Activo"
    this.permisos = this.LoginService.leerPermisos()
    this.ListModulos()

    if (sessionStorage.getItem('token')) {
      setInterval(() => {
        this.elapsedTime = this.timerService.getElapsedTime();
      }, 500);
    }

    var usuarioID = sessionStorage.getItem('usuarioID')
    usuarioID = this.auth.desencriptar(usuarioID)

    // var token = sessionStorage.getItem('token')
    // token = this.auth.desencriptar(token)




    // console.log(this.status)


    const token = sessionStorage.getItem('token')

    // this.scheduleCheck(usuarioID, token);

    // setInterval(() => {
    //   // console.log('enviando datos')
    //   this.scheduleCheck(usuarioID, token);
    // },60000)


    if (token != null) {
      const eventSource = new EventSource('http://10.8.8.115:3004/events');
      eventSource.addEventListener('message', (event: any) => {
        const jsonData = JSON.parse(event.data)
        const dataContent = jsonData.data
        const resultado = this.auth.desencriptar(dataContent)
        var respuesta = JSON.parse(resultado)
        respuesta = respuesta[0]

        var usuarioId = sessionStorage.getItem('usuarioID')
        usuarioId = this.auth.desencriptar(usuarioId)
        if (respuesta.status == 1) {

          var dataResult = JSON.parse(respuesta.data)
          dataResult = dataResult[0]
          // if (dataResult.RECEPTOR == usuarioId || dataResult.RECEPTOR == 4025) {
          localStorage.setItem('notificacion', "1")
          this.notificacion = localStorage.getItem('notificacion')
          // }

          let arregloDatos: any[] = JSON.parse(localStorage.getItem('recibido') || '[]');

          // Agregar el nuevo valor de dataResult.emisor al arreglo si no existe previamente
          const nuevoValor = dataResult.RECEPTOR;
          if (!arregloDatos.includes(nuevoValor)) {
            arregloDatos.push(nuevoValor);
          }

          // Almacenar el arreglo actualizado en el localStorage
          localStorage.setItem('recibido', JSON.stringify(arregloDatos));
        }
      });
    }

    // this.close()

  }



  // scheduleCheck(usuarioID:any, token:any) {

  //   // setInterval(() => {
  //     // console.log('enviar')
  //     // token = '123klk'
  //     // this.timerService.check(usuarioID, token).subscribe(response => {
  //     //   // var respuesta = JSON.parse()
  //     //   console.log(response);
  //     // }, error => {
  //     //   console.error('Error en check:', error);
  //     // });
  //     this.timerService.check(usuarioID,token).subscribe(res => {
  //       // var respuesta = JSON.parse(res)
  //       var respuesta = res
  //       console.log(respuesta.message)
  //     })
  //   // }, 60000); // 60000ms = 1 minuto
  // }



  ValidarSesion() {

    var usaurioID = sessionStorage.getItem('usuarioID')
    if (usaurioID) {
      // var usaurioID = sessionStorage.getItem('usuarioID')
      usaurioID = this.service.desencriptar(usaurioID)

      this.timerService.validarSesion(usaurioID).subscribe(r => {
        var respuesta = this.auth.desencriptar(r.response)
        respuesta = JSON.parse(respuesta)
        respuesta = respuesta[0]
        // console.log('SESSION ACTIVA: ',respuesta)
        if (respuesta.status == 0) {
          this.service.notificacion(respuesta.message)
          this.LoginService.sesionDestroy()
          this.router.navigate(['./login'])
        }
        // else{
        //   this.service.notificacion(respuesta.message)
        // }


      })
    }




    this.isLogged = (sessionStorage.getItem('logged') == "true") ? true : false;
    if (sessionStorage.getItem('logged') == "true") {
      this.LoginService.getPermisos()?.subscribe(res => {
        var permisos = res.data
        sessionStorage.setItem("permisos", permisos)
        this.permisos = this.LoginService.leerPermisos()
        this.ListModulos()
      })
    }
    // console.log("validar session")

    // var permisos = sessionStorage.getItem('permisos')
    // if (permisos == undefined) {
    //   console.log('usuario sin session')
    //   this.router.navigate(['./login'])
    // }
  }

  cerrarSesion() {
    this.LoginService.sesionDestroy()
  }

  ListModulos() {

    if (this.permisos != undefined && this.permisos != null) {

      this.modulos = new Set(this.permisos.map((e: any) => (e.MODULO)))
    }
  }

  cambiarEstado() {
    if (this.status == "Activo") {
      this.status = "Pausa"
      this.estadoOperativoID = 2
    } else {
      this.status = "Activo"
    }
    this.tiempo = this.timer.getElapsedTime()
    // alert(tiempo)
    this.timer.startTimer();
    this.GuardarTiempoOperativo()
  }

  GuardarTiempoOperativo() {
    this.timer.Guardar(this.estadoOperativoID, this.tiempo, this.tiempo, this.carteraId).subscribe(r => {
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

  removerTildes(text: string) {
    var resultado = text.toLowerCase()
    resultado = resultado.replace('á', 'a')
    resultado = resultado.replace('é', 'e')
    resultado = resultado.replace('í', 'i')
    resultado = resultado.replace('ó', 'o')
    resultado = resultado.replace('ú', 'u')
    // console.log(resultado)
    return resultado.toUpperCase()
  }
}


