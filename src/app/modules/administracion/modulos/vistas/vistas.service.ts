import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VistasService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api

  getModulosVistas(ModuloId: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: "sp_modulos_vistas",
      token: token,
      ModuloId: ModuloId
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de vistas"))
      )
  }

  getNameModuloVista(ModuloId: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: "modulos_get_name",
      token: token,
      ModuloId: ModuloId
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener el nombre del modulo"))
      )
  }

  CrearVista(ModuloId: number, Vista: string, VistaUrl: string): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'modulos_vistas_create',
      token: token,
      ModuloId: ModuloId,
      Vista: Vista,
      VistaUrl: VistaUrl
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al crear la nueva vista"))
      )
  }

  UpdateVista(VistaID: number, Vista: string, VistaUrl: string): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'MODULOS_VISTAS_UDPATE',
      token: token,
      VistaID: VistaID,
      Vista: Vista,
      VistaUrl: VistaUrl
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al modificar la vista"))
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
      this.notificacion(operation)
      console.log(error)
      return of(result as T)
    }
  }
}
