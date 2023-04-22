import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

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

  ObtenerListaEstadosOperativos(): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: "estados_operativos_lista", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se puedo obtener la lista de estados operativos"))
      )
  }

  getListaCarteras(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "carteras_lista", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer la lista de carteras"))
      )
  }

  Crear(estado: string, carteraid: number | string, deSistema: number): Observable<any> {
    var payload = this.auth.mkpayload({
      proc: "estados_operativo_create",
      estado: estado,
      carteraid: carteraid,
      deSistema: deSistema
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al crear el estado operativo"))
      )
  }

  Update(estadoOperativoID:number, estadoOperativo: string, carteraid:number, deSistema:number, estado:number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "estados_operativos_update",
      token: token,
      estadoOperativoID: estadoOperativoID,
      estadoOperativo: estadoOperativo,
      carteraid: carteraid,
      deSistema: deSistema,
      estado: estado
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al actualizar el estado operativo"))
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
