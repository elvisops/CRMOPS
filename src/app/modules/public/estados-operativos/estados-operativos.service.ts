import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadosOperativosService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar    
  ) { }

  api = environment.api

  getEstadosOperativos(): Observable<any> { 
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: "estados_operativos_get", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer la lista de Estados Operativos"))
      )      
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Error en la aplicacion: ' + JSON.stringify(error));
      console.log(error)
      return of(result as T)
    }
  }

  SetUserState(estadoOperativoID: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: "USER_SET_ESTADO", token: token, estadoOperativoID: estadoOperativoID })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al actualizar el estado operativo"))
      )
  }

  getEstadoActual(): Observable<any>{
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: "estado_operativo_actual_get",
      token: token
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener el Estado Operativo actual"))
      )  
  }
  

  notificacion(msg: string): void {
    this.snack.open(msg, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
      panelClass: 'app-notification-success'
    })
  }

  notificacionError(msg: string):void {
    this.snack.open(msg, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
      panelClass: 'app-notification-error'
    })
  }

}
