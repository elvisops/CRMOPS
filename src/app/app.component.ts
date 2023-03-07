import { Component,  HostListener, OnInit } from '@angular/core';
import { AuthService } from './guards/auth/auth.service';
import { LoginService } from './modules/administracion/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  
  title = 'CRM OPS';
  isLogged:boolean = false
  username:string = ""
  permisos:any = []
  modulos:any = []

  constructor(
    private LoginService:LoginService,
    private auth:AuthService
  ){}

  @HostListener('window:storage',['$event'])
  onStorageChange(event:StorageEvent){
    if(event.newValue == 'token' || event.key == 'token'){            
      this.ValidarSesion()
    }    
  } 

  ngOnInit(): void {
    this.ValidarSesion()
    this.username = sessionStorage.getItem('usuario') || ""  
    this.permisos = this.LoginService.leerPermisos()    
    this.ListModulos()
  }

  
  
  ValidarSesion(){
    this.isLogged = (sessionStorage.getItem('logged')=="true")?true:false;    
  }

  cerrarSesion(){
    this.LoginService.sesionDestroy()
  }

  ListModulos(){    
    
    if(this.permisos != undefined && this.permisos != null){

      this.modulos = new Set(this.permisos.map( (e:any) => (e.MODULO)))    
    }    
  }

  removerTildes(text:string){
    var resultado = text.toLowerCase()
    resultado = resultado.replace('á','a')
    resultado = resultado.replace('é','e')
    resultado = resultado.replace('í','i')
    resultado = resultado.replace('ó','o')
    resultado = resultado.replace('ú','u')   
    console.log(resultado)
    return resultado.toUpperCase()

  }
  
}
