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
export class ExtensionesUsuariosService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api

  getListaExtensiones(carteraID: number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"extensiones_cartera_lista",token: token,carteraID:carteraID})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de extensiones"))
    )
  }

  getListaExtensionesUpdate(carteraID: number,extensionID: number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"extensiones_cartera_edit_lista",token: token,carteraID:carteraID,extensionID: extensionID})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de extensiones"))
    )
  }

  getListaUsuarios(carteraID: number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"user_cartera_lista",token:token,carteraID:carteraID})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de usuarios"))
    )
  }

  getListaUsuariosUpdate(carteraID: number,usuarioID: number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"user_cartera_edit_lista",token:token,carteraID:carteraID,usuarioID:usuarioID})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de usuarios"))
    )
  }

  getListaUsuarioExtension(carteraID: number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"usuario_extension_lista",token: token,carteraID:carteraID})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de extensiones"))
    )
  }

  Crear(extensionID: number, usuarioID: number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "usuario_extension_create",
      token: token,
      extensionID: extensionID,
      usuarioID: usuarioID,
      // descripcion: descripcion
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al crear la extensiones"))
    )
  }

  Update(extensionID:number , usuarioID:number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "usuario_extension_update",
      token: token,
      extensionID: extensionID,
      usuarioID: usuarioID
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al actualizar la extension del usuario"))
    )
  }

  Delete(extensionID:number , usuarioID:number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "usuario_extension_delete",
      token: token,
      extensionID: extensionID,
      usuarioID: usuarioID
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al actualizar la extension del usuario"))
    )
  }
  notificacion(msg:string):void{
    this.snack.open(msg,"Cerrar",{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration:5000,
      panelClass: 'app-notification-success'
    })
  }

  notificacionError(msg:string):void{
    this.snack.open(msg, "Cerrar",{
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
      panelClass: 'app-notification-error'
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
