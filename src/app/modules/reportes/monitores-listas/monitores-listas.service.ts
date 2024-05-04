import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';
import * as ExcelJS from 'exceljs';


@Injectable({
  providedIn: 'root'
})
export class MonitoresListasService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar,
  ) { }

  api = environment.api;

  getListaCarteras(): Observable<any> {
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      proc: 'CARTERAS_LISTAS_USUARIO',
      token: token,
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener la lista de carteras'))
      );
  }

  getListaMonitores(carteraID:number): Observable<any> {
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      proc: 'monitores_lista',
      token: token,
      carteraID: carteraID,
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener la lista de carteras'))
      );
  }

  getDatos(MONITORID:string, fechaInicio:any, fechaFin: any): Observable<any>{
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'generar_data_monitor',
      token: token,
      MONITORID: MONITORID,
    })
    return this.http.post<any>(`${this.api}/api/get`, {payload})
    .pipe(
      tap(),
      catchError(this.handleError('Error al obtener los datos de monitor'))
    )
  }

  Desloguear(usuarioID: number){
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "logout_user_manual",
      token: token,
      usuarioID: usuarioID
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al desloguear el usuario"))
    )
  }

  quitarPausa(usuarioID: number){
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "remove_user_pause",
      token: token,
      usuarioID: usuarioID
    })
    return this.http.post<any>(`${this.api}/api/proc`, {payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al quitar la pausa del usuario"))
    )
  }

  getMonitor(monitorID: number){
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'monitores_informacion',
      token: token,
      monitorID: monitorID
    })
    return this.http.post<any>(`${this.api}/api/get`, {payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al Eliminar el reporte"))
    )
  }

  createMonitor(carteraID: number, monitor: string,query: string, tipoMonitor: number){
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "monitores_create",
      token: token,
      carteraID: carteraID,
      monitor: monitor,
      query: query,
      tipoMonitor: tipoMonitor
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al crear el monitor"))
    )
  }

  updateMonitor(monitor:string, monitorID: number, query: string, tipoMonitor:number){
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "monitores_update",
      token: token,
      monitor: monitor,
      monitorID: monitorID,
      query: query,
      tipoMonitor: tipoMonitor
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al Modificar el reporte"))
    )
  }


  deleteMonitor(monitorID: number){
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'monitores_delete',
      token: token,
      monitorID: monitorID
    })
    return this.http.post<any>(`${this.api}/api/proc`, {payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al Eliminar el reporte"))
    )
  }

  notificacion(msg: string): void {
    this.snack.open(msg, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Error en la aplicacion: ' + JSON.stringify(error));
      this.notificacion(operation);
      console.log(error);
      return of(result as T);
    };
  }
}
