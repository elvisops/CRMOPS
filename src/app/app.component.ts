import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './guards/auth/auth.service';
import { LoginService } from './modules/administracion/login/login.service';
import { TimerServiceService } from './timer-service.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { EstadosOperativosComponent } from './modules/public/estados-operativos/estados-operativos.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from './modules/public/chat/chat.component';

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
  notificacion: string | null = localStorage.getItem('notificacion')



  constructor(
    private LoginService: LoginService,
    private auth: AuthService,
    private timerService: TimerServiceService,
    private timer: TimerServiceService,
    private service: AuthService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {
    this.ValidarSesion()

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


  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.newValue == 'token' || event.key == 'token') {
      this.ValidarSesion()

    }
  }

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

    console.log(this.status)


    const token = sessionStorage.getItem('token')
    if (token != null) {
      const eventSource = new EventSource('http://10.8.8.115:3007/events');
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
          if (dataResult.receptor == usuarioId || dataResult.receptor == 4025) {
            localStorage.setItem('notificacion', "1")
            this.notificacion = localStorage.getItem('notificacion')
          }

          let arregloDatos: any[] = JSON.parse(localStorage.getItem('recibido') || '[]');

          // Agregar el nuevo valor de dataResult.emisor al arreglo si no existe previamente
          const nuevoValor = dataResult.receptor;
          if (!arregloDatos.includes(nuevoValor)) {
            arregloDatos.push(nuevoValor);
          }

          // Almacenar el arreglo actualizado en el localStorage
          localStorage.setItem('recibido', JSON.stringify(arregloDatos));
        }
      });
    }


  }


  ValidarSesion() {
    this.isLogged = (sessionStorage.getItem('logged') == "true") ? true : false;
    if (sessionStorage.getItem('logged') == "true") {
      this.LoginService.getPermisos()?.subscribe(res => {
        var permisos = res.data
        sessionStorage.setItem("permisos", permisos)
        this.permisos = this.LoginService.leerPermisos()
        this.ListModulos()
      })
    }

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
    console.log(resultado)
    return resultado.toUpperCase()
  }
}


