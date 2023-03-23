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
export class TiposDireccionesService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api

  Crear(tipo: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    var payload = this.auth.mkpayload({ proc: "tipos_direcciones_create", token: token, tipo: tipo })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al crear el tipo de direccion"))
      )
  }

  update(tipoDireccionId: number, tipo: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    var payload = this.auth.mkpayload({
      proc: "tipos_direcciones_update",
      token: token,
      tipoDireccionId: tipoDireccionId,
      tipo: tipo
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al modificar el tipo de direccion"))
      )
  }

  ObtenerListaTiposDirecciones(): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: "tipos_direcciones_lista", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de tipos de telefonos"))
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
