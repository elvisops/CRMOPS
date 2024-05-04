import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  private _datos = '0'
  get datos(){
    return this._datos
  }

  setdatos(valor: any){
    this._datos = valor
  }

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

  getMensajes(usuarioID:string|null|number,esGrupo:number|null):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"traer_chats",token:token,usuarioID:usuarioID,esGrupo:esGrupo})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al traer el chat del usuario"))
    )
  }

  
  getMasMensajes(grupo:string|null, esGrupo:number, primerMensaje: string):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
        proc:"traer_mas_mensajes",
        token:token,
        // usuarioID:usuarioID,
        grupo:grupo,
        esGrupo:esGrupo,
        primerMensaje:primerMensaje
      })
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al traer el chat del usuario"))
    )
  }


  enviarMensaje(usuarioEmisor:number | null, usuarioReceptor:number|null, mensaje:string, extencion: null|string, archivo: string, nombreArchivo: string| undefined):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      // proc:"enviar_mensaje",
      token:token,
      usuarioEmisor:usuarioEmisor,
      usuarioReceptor:usuarioReceptor,
      mensaje:mensaje,
      extencion:extencion,
      archivo: archivo,
      nombreArchivo: nombreArchivo
    })


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var data = { 'payload': payload }
    return this.http.post<any>('http://10.8.8.115:3004/send-message', data, httpOptions)
    .pipe(
      tap(),
      catchError(this.handleError("Error al enviar el mensaje"))
    )

  }
  

  // enviarMensaje(usuarioEmisor:number | null, usuarioReceptor:number|null, mensaje:string, extencion: null|string):Observable<any>{
  //   var token = sessionStorage.getItem('token')
  //   token = this.auth.desencriptar(token)
  //   var payload = this.auth.mkpayload({
  //     proc:"enviar_mensaje",
  //     token:token,
  //     usuarioEmisor:usuarioEmisor,
  //     usuarioReceptor:usuarioReceptor,
  //     mensaje:mensaje,
  //     extencion:extencion
  //   })
  //   return this.http.post<any>(`${this.api}/api/proc`,{payload})
  //   .pipe(
  //     tap(),
  //     catchError(this.handleError("Error al enviar el mensaje"))
  //   )
  // }

  filtrarEnChat(receptorID: number|null, busqueda: string):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "buscar_en_chat",
      token: token,
      receptorID: receptorID,
      busqueda: busqueda
    })
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al realizar la busqueda de mensajes"))
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
