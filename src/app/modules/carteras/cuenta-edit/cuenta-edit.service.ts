import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaEditService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api

  getListaBuro(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'buro_lista',
      token: token
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de nivel buro"))
      )
  }

  getListaDistribuidores(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'distribuidores_lista',
      token: token
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de Distribuidores"))
      )
  }

  getListaConfirmacion(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'confirmaciones_clientes_lista',
      token: token
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de confirmaciones clientes"))
      )
  }

  getListaEstadoValidacion(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'estado_validacion_lista',
      token: token
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de estados validaciones"))
      )
  }

  getDataCliente(identidad: string, carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'data_cliente_editv2',
      token: token,
      identidad: identidad,

    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de estados validaciones"))
      )
  }

  updateData(nombre: string,
    identidad: string,
    nivelBuro: number,
    distribuidor: number,
    numeroCliente: string,
    telPersonalID: number,
    confirmacion: number,
    refLaboral: string,
    telRefLaboral: string,
    telRefLaboralID: number,
    resultadoRefLaboral: number,
    refPersonal: string,
    telRefPersonal: string,
    telRefPersonalID: number,
    resultadoRefPersonal: number,
    refFamiliar: string,
    telRefFamiliar: string,
    telRefFamiliarID: number,
    resultadoRefFamiliar: number,
    cambioReferencia: number,
    estadoValidacion: number,
    numeroOrden: string,
    comentario: string,
    carteraID: number,
    personaid: number
  ): Observable<any> {
    var token = sessionStorage.getItem('token')

    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'cliente_updatev2',
      token: token,
      nombre: nombre,
      identidad: identidad,
      nivelBuro: nivelBuro,
      distribuidor: distribuidor,
      numeroCliente: numeroCliente,
      telPersonalID: telPersonalID,
      confirmacion: confirmacion,
      refLaboral: refLaboral,
      telRefLaboral: telRefLaboral,
      telRefLaboralID: telRefLaboralID,
      resultadoRefLaboral: resultadoRefLaboral,
      refPersonal: refPersonal,
      telRefPersonal: telRefPersonal,
      telRefPersonalID: telRefPersonalID,
      resultadoRefPersonal: resultadoRefPersonal,
      refFamiliar: refFamiliar,
      telRefFamiliar: telRefFamiliar,
      telRefFamiliarID: telRefFamiliarID,
      resultadoRefFamiliar: resultadoRefFamiliar,
      cambioReferencia: cambioReferencia,
      estadoValidacion: estadoValidacion,
      numeroOrden: numeroOrden,
      comentario: comentario,
      carteraID: carteraID,
      personaid: personaid
    })
    return this.http.post(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de estados validaciones"))
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

  notificacionError(msg: string): void {
    this.snack.open(msg, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
      panelClass: 'app-notification-error'

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
