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
export class ChatService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api

  // getIdUsuario():Observable<any>{
  //   var token = sessionStorage.getItem('token')
  //   token = this.auth.desencriptar(token)
  //   var payload = this.auth.mkpayload({proc:"",token:token})
  //   return this.http.post<any>(`${this.api}/api/get`,{payload})
  //   .pipe(
  //     tap(),
  //     catchError(this.handleError("Error al obtener el id del usuario"))
  //   )
  // }

  getListaContactos():Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"contactos_lista",token:token})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de contactos"))
    )
  }

  getChatUsuarios(usuarioID:string|null,grupo:number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"chat_user2",token:token,usuarioID:usuarioID,grupo:grupo})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al traer el chat del usuario"))
    )
  }

  enviarMensaje(usuarioEmisor:number | null, usuarioReceptor:number|null, mensaje:string, extencion: null|string):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc:"enviar_mensaje",
      token:token,
      usuarioEmisor:usuarioEmisor,
      usuarioReceptor:usuarioReceptor,
      mensaje:mensaje,
      extencion:extencion
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al enviar el mensaje"))
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
