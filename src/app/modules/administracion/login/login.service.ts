import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpRequest } from './httprequest.interface';
import { HttpResponse } from './httpresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = environment.api;

  DataSend:HttpRequest = {proc:"",payload:""};
  
  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private snack:MatSnackBar
  ) { }

  login(usuario:string,password:string):Observable<any>{
    var payload = this.auth.mkpayload({proc:"user_auth",usuario:usuario,password:password})
    return this.http.post<any>(`${this.api}/api/proc`,{proc:"login",payload:payload})
            .pipe(
              tap(),
              catchError(this.handleError("Error al iniciar la sesion"))
            )
  }  

  getPermisos(){
    var token = sessionStorage.getItem('token')
    if(token==undefined || token==""){
      this.sesionDestroy()
      return
    }
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"user_permisos",token:token})

    return this.http.post<any>(`${this.api}/api/get`,{proc:"get_permisos",payload:payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener los permisos de usuario"))
    )

  }

  setLogoutDB():Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"USER_SET_LOGOUT",token:token})
    return this.http.post<any>(`${this.api}/api/proc`,{proc:"logout",payload:payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al cerrar la sesion"))
    )
  }

  setUserState(EstadoID:number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"USER_SET_ESTADO",token:token,EstadoID:EstadoID})
    return this.http.post<any>(`${this.api}/api/proc`,{proc:"USER_SET_ESTADO",payload:payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al cambiar el estado del usuario"))
    )
  }
  
  /*inicializar variables de sessionStorage*/
  setSessionStorage(){
    sessionStorage.setItem('logged','true')  
      
  }  

  leerPermisos():any{
    if(sessionStorage.getItem('permisos')!=undefined){
      var permisos:any = sessionStorage.getItem('permisos')
      permisos = this.auth.desencriptar(permisos)
      permisos = JSON.parse(permisos)    
      return permisos;
    }
    
  }
  
  sesionDestroy(){  
    this.setLogoutDB().subscribe(res=>{
      console.log(res)      
      sessionStorage.clear()    
      window.location.href = './'
    })
    
    
  }

  notificacion(msg:string):void{
    this.snack.open(msg,"Cerrar",{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration:5000
    })
  }

  private handleError<T>(operation = 'operacion', result?:T){
    return(error:any):Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error));
      console.log(error)
      return of(result as T)      
    }
  }

}
