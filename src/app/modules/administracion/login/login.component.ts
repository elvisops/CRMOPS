import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Router } from '@angular/router';
import { TimerServiceService } from 'src/app/timer-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../../styles.css'
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private service: LoginService,
    private snack: MatSnackBar,
    private auth: AuthService,
    private router: Router,
    private timerService: TimerServiceService
  ) { }

  hide = true;
  usuario: string = "";
  password: string = "";

  inactive: boolean = false
  inactiveMsg: string = ""

  elapsedTime?: number
  isLoading: boolean = false

  ngOnInit(): void {
    this.validarSesionActiva()

    this.service.removeUserPantalla().subscribe(r => {
      // var respuesta = this.auth.desencriptar(r.data)
      // respuesta = JSON.parse(respuesta)
    })
  }

  notificacion(msg: string) {
    this.snack.open(msg, "cerrar", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    })
  }

  setActive() {
    if (this.inactive) {
      this.inactive = false
    }
  }

  validarSesionActiva() {
    if (sessionStorage.getItem('logged') == "true") {
      this.router.navigate(['./inicio'])
    }
  }

  IniciarSesion() {
    this.isLoading = true
    if (this.inactive) {
      this.notificacion("!No se puede ingresar al sistema con un usuario bloqueado!")
      return;
    }
    if (this.usuario == "" || this.usuario.length < 1 || this.password == "" || this.password.length < 1) {
      this.notificacion("Ingrese el usuario y contraseña")
      return;
    }
    this.service.login(this.usuario, this.password).subscribe(res => {
      var respuesta = JSON.parse(this.auth.desencriptar(res.response))
      // console.log(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {

        this.notificacion("Bienvenido " + this.usuario)
        var obj = JSON.parse(respuesta.data)
        obj = obj[0]

        var token = this.auth.encriptar(obj.token).toString()
        var username = (obj.username)
        var estadoLogin = '3'       
        estadoLogin = this.auth.encriptar(estadoLogin).toString()

        var rolID = (obj.rolID)
        var usuarioID = this.auth.encriptar(obj.usuarioid).toString()

        var extension = this.auth.encriptar(obj.extension).toString()
        
        // var extension = obj.extension


        // console.log(respuesta.data[0])
        sessionStorage.setItem("token", token)
        sessionStorage.setItem('usuario', username)
        sessionStorage.setItem('EstadoOperativo',estadoLogin)
        sessionStorage.setItem('rolID',rolID)
        sessionStorage.setItem('usuarioID',usuarioID)
        sessionStorage.setItem('extension',extension)
        this.service.setSessionStorage()        
        this.timerService.startTimer();        
        

        this.isLoading = false

        // nuevo, validar sesiones
        // this.service.enviarDatos(token,usuarioID).subscribe(res =>{

        // }
        usuarioID = this.auth.desencriptar(usuarioID)
        console.log('usuarioID: ',usuarioID)
        // this.service.enviarDatos(token,usuarioID).subscribe(res => {
        //   var respuesta = JSON.parse(res)
        //   console.log(respuesta)
        // })
        

        // this.service.enviarDatos(usuarioID,token).subscribe(res => {
        //   var respuesta = JSON.parse(res)
        //   console.log(respuesta)
        // });

        // this.scheduleCheck(usuarioID, token);
        
        window.location.href = "./"

      } else {
        //Validar si el usuario esta inactivo
        if (respuesta.data == "-1") {
          this.inactive = true
          this.inactiveMsg = "Su usuario esta bloqueado o deshabilitado, pongase en contacto con un administrador"
        }
        this.isLoading = false
        this.notificacion(respuesta.message)


      }
    })

  }

  // scheduleCheck(usuarioID:any, token:any) {
  //   setInterval(() => {
  //     console.log('enviar')
  //     this.service.check(usuarioID, token).subscribe(response => {
  //       console.log(response);
  //     }, error => {
  //       console.error('Error en check:', error);
  //     });
  //   }, 60000); // 60000ms = 1 minuto
  // }



}
