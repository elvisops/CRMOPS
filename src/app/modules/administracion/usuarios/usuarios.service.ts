import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private snack:MatSnackBar
  ) { }

  api = environment.api

  getListaUsuarios():Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"user_lista",token:token})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de usuarios"))
    )
  }

  getListaRoles():Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"roles_lista",token:token})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de usuarios"))
    )
  }

  Crear(usuario:string,clave:string,rolid:number|string):Observable<any>{    
    var payload = this.auth.mkpayload({
        proc:"user_create",
        usuario:usuario,
        rolid:rolid,
        clave:clave        
      })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de usuarios"))
    )
  }

  Update(UsuarioID:number,Usuario:string,RolID:number,Estado:boolean):Observable<any>{
    var estadodb = (Estado)?'1':'0'
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc:"user_update",
      token:token,
      UsuarioID:UsuarioID,
      Usuario:Usuario,
      RolID:RolID,
      Estado:estadodb
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al actualizar el usuario"))
    )
  }

  ChEstado(UsuarioID:number,accion:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc:"user_"+accion,
      UsuarioID:UsuarioID
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al cambiar el estado del usuario"))
    )
  }

  ChPass(Usuario:string,Clave:string):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"user_chpass",Usuario:Usuario,Clave:Clave})
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al cambiar la clave de usuario"))
    )
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
      this.notificacion(operation)
      console.log(error)
      return of(result as T)      
    }
  }

}
