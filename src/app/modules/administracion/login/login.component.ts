import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Router } from '@angular/router';


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
    private service:LoginService,
    private snack:MatSnackBar,
    private auth:AuthService,
    private router:Router
  ){}

  hide = true;
  usuario:string = "";
  password:string = "";

  inactive:boolean = false
  inactiveMsg:string = ""

  ngOnInit():void{
    this.validarSesionActiva()  
  }

  notificacion(msg:string){
    this.snack.open(msg,"cerrar",{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:5000
    })
  }

  setActive(){
    if(this.inactive){
      this.inactive = false      
    }
  }

  validarSesionActiva(){
    if(sessionStorage.getItem('logged')=="true"){
      this.service.getPermisos()?.subscribe(res=>{
        console.log(res)
        var permisos = res.data        
        sessionStorage.setItem('permisos',permisos)
      })
      this.router.navigate(['./inicio'])
    }
  }

  IniciarSesion(){    
    if(this.inactive){
      this.notificacion("!No se puede ingresar al sistema con un usuario bloqueado!")
      return;
    }
    if(this.usuario==""||this.usuario.length<1||this.password == "" || this.password.length<1)
    {      
      this.notificacion("Ingrese el usuario y contraseña")      
      return;
    }

    this.service.login(this.usuario,this.password).subscribe(res=>{
      var respuesta = JSON.parse(this.auth.desencriptar(res.response))
      respuesta = respuesta[0]            
      if(respuesta.status == 1){
        
        this.notificacion("Bienvenido "+this.usuario)                  
        var obj = JSON.parse(respuesta.data)
        obj = obj[0]

        var token = this.auth.encriptar(obj.token).toString()        
        var username = (obj.username)

        console.log(respuesta.data[0])
        sessionStorage.setItem("token",token)
        sessionStorage.setItem('usuario',username)
        this.auth.setSessionStorage()        

        window.location.href="./"
      }else{
        //Validar si el usuario esta inactivo
        if(respuesta.data == "-1"){
          this.inactive = true
          this.inactiveMsg = "Su usuario esta bloqueado o deshabilitado, pongase en contacto con un administrador"          
        }
        this.notificacion(respuesta.message)        
      }
    })

  } 

}
