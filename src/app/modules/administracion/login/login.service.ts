import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpRequest } from './httprequest.interface';
import { HttpResponse } from './httpresponse.interface';

import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = environment.api;

  private apiUrl = 'http://10.8.8.115:3007';

  DataSend: HttpRequest = { proc: "", payload: "" };

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  login(usuario: string, password: string): Observable<any> {
    var payload = this.auth.mkpayload({ proc: "user_auth", usuario: usuario, password: password })
    return this.http.post<any>(`${this.api}/api/proc`, { proc: "login", payload: payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al iniciar la sesion"))
      )
  }

  // enviarDatos(token:any, usuarioID:any):Observable<any>{
  //   return this.http.post(this.apiUrl, { token, usuarioID })
  //   .pipe(
  //     tap(),
  //     catchError(this.handleError("Error al enviar los datos"))
  //   )
  // }

  // startKeepAlive(usuarioID: string, token: string) {
  //   // this.usuarioID = usuarioID;
  //   // this.token = token;

  //   // Enviar keep-alive cada 1 minuto (60000 milisegundos)
  //   interval(60000).pipe(
  //     switchMap(() => this.enviarDatos(token, usuarioID))
  //   ).subscribe(
  //     response => console.log('Keep-alive enviado', response),
  //     error => console.error('Error en keep-alive', error)
  //   );
  // }
  
  enviarDatos(userID: string, token: string): Observable<any> {
    console.log(`${this.apiUrl}/login`)
    // token = '123456'
    console.log('userID: ', userID, ' token: ',token)
    return this.http.post<any>(`${this.apiUrl}/login`, { userID:userID, token:token })
    .pipe(
      tap(),
      catchError(this.handleError("Error al enviar los datos 1"))
    );
  }

  check(userID: string, token: string): Observable<any> {
    console.log(`${this.apiUrl}/check`)

    return this.http.post(`${this.apiUrl}/check`, { userID:userID, token:token })
    .pipe(
      tap(),
      catchError(this.handleError("Error al enviar los datos"))
    );
  }

  getPermisos() {
    var token = sessionStorage.getItem('token')
    if (token == undefined || token == "") {
      this.sesionDestroy()
      return
    }
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "user_permisos", token: token })

    return this.http.post<any>(`${this.api}/api/get`, { proc: "get_permisos", payload: payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener los permisos de usuario"))
      )

  }

  setLogoutDB(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "USER_SET_LOGOUT", token: token })
    return this.http.post<any>(`${this.api}/api/proc`, { proc: "logout", payload: payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al cerrar la sesion"))
      )
  }

  setUserState(EstadoID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "USER_SET_ESTADO", token: token, EstadoID: EstadoID })
    return this.http.post<any>(`${this.api}/api/proc`, { proc: "USER_SET_ESTADO", payload: payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al cambiar el estado del usuario"))
      )
  }

  /*inicializar variables de sessionStorage*/
  setSessionStorage() {
    sessionStorage.setItem('logged', 'true')

  }

  leerPermisos(): any {
    if (sessionStorage.getItem('permisos') != undefined) {
      var permisos: any = sessionStorage.getItem('permisos')
      permisos = this.auth.desencriptar(permisos)
      permisos = JSON.parse(permisos)
      // console.log(permisos)

      return permisos;
    }

  }

  sesionDestroy() {
    this.setLogoutDB().subscribe(res => {
      // console.log(res)      
      sessionStorage.clear()
      window.location.href = './'
    })


  }

  removeUserPantalla(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'usuario_en_pantalla_remove',
      token: token
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al remover la pantalla en la que se encuentra el usuario"))
      )
  }


  notificacion(msg: string): void {
    this.snack.open(msg, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000
    })
  }

  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Error en la aplicacion: ' + JSON.stringify(error));
      console.log(error)
      return of(result as T)
    }
  }

}
