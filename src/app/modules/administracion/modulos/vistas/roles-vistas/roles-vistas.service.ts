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
export class RolesVistasService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api

  getListaRoles(vistaID: any): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "ROLES_VISTAS_LISTA",
      token: token,
      vistaID: vistaID
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al lees la lista de usuarios"))
      )
  }

  getRolesAsignados(vistaId: any): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "roles_asignados",
      token: token,
      vistaId: vistaId
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer los permisos asignados"))
      )
  }

  Guardar(rolID: any, vistaID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    // vistaID = vistaID
    var payload = this.auth.mkpayload({
      proc: "ROLES_VISTAS_CREATE",
      token: token,
      rolID: rolID,
      vistaID: vistaID
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al guardar los roles"))
      )
  }

  Eliminar(rolID: any, vistaID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "ROLES_VISTAS_DELETE",
      token: token,
      rolID: rolID,
      vistaID: vistaID
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al eliminar el rol"))
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
