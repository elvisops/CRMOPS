import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';
import { AuthService } from './guards/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TimerServiceService {
  private startTime?: number ;
  private horas: number = 0;
  private minutos: number = 0;
  private segundos: number = 0;

  constructor(
    private auth:AuthService,
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }

  startTimer(){
    this.startTime = new Date().getTime();
    sessionStorage.setItem("timer", this.startTime.toString())
  }

  getElapsedTime(): any{
    if(this.startTime === undefined){
      this.startTime = Date.now()
    }

    const currentTime = new Date().getTime();

    const now = new Date();
    const startTimer = Number(sessionStorage.getItem('timer'))
    const diff = Math.round((currentTime - startTimer) / 1000)
    this.horas = Math.floor(diff / 3600)
    this.minutos = Math.floor(diff / 60)
    this.segundos = diff % 60

    if (this.horas == 0) {
      return this.minutos + ":" + this.segundos;
    }else if(this.minutos == 0){
      return this.segundos;
    }else{
      return this.horas + ":" + this.minutos + ":" + this.segundos;
    }
  }

  api = environment.api

  private apiUrl = 'http://10.8.8.115:3007';


  validarSesion(usuarioID: string|null){
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "token_validate",
      token: token,
      usuarioID: usuarioID
    })
    return this.http.post<any>(`${this.api}/api/proc`, {payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al traer los datos"))
    )
  }

  check(userID: string, token: string): Observable<any> {
    // console.log(`${this.apiUrl}/check`)
    return this.http.post<any>(`${this.apiUrl}/check`, { userID:userID, token:token })
    .pipe(
      tap(),
      catchError(this.handleError("Error al enviar los datos 2"))
    );
  }

  
  Guardar(estadoOperativoID:number, inicio:string, fin:string, carteraId:number): Observable<any>{
    var token = sessionStorage.getItem('token')
    var payload = this.auth.mkpayload({
      proc: "guardar_tiempo_operativo",
      token: token,
      estadoOperativoID: estadoOperativoID,
      inicio: inicio,
      fin: fin,
      carteraId: carteraId
    })
    return this.http.post<any>(`${this.api}/api/proc`, {payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al ingresar el tiempo operativo"))
    )
  }

  actualizarEstadoOperativo(usuarioID: string|null): Observable<any>{
    var payload = this.auth.mkpayload({
      proc: "estado_operativo_validate",
      usuarioID: usuarioID
    })
    return this.http.post<any>(`${this.api}/api/proc`, {payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al ingresar el tiempo operativo"))
    )
  }

   //manejo de errores mensaje
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
      this.notificacion(operation)
      console.log(error)
      return of(result as T)
    }
  }
}
