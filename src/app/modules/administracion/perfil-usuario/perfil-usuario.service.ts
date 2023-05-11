import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ObservableInput, of } from 'rxjs'
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api

  traerDatosUsuario(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "GET_DATOS_USUARIO", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al traer los datos del cliente "))
      )
  }

  getListaTiposTelefonos(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "TIPOS_TELEFONOS_LISTA",
      token: token
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer la lista de tipos de telefonos"))
      )
  }

  getListaTiposCorreos(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "tipos_correos_lista",
      token: token
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer la lista de tipos de correos"))
      )
  }

  getListaTiposDirecciones(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "tipos_direcciones_lista",
      token: token
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer la lista de tipos de direcciones"))
      )
  }

  getListaMunicipios(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "municipios_lista",
      token: token
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer los municipios"))
      )
  }

  Update(UsuarioId: number | string, Identidad: string, Nombre: string,
    Telefono: string, TipoTelefonoId: number | string, Email: string,
    TipoCorreoId: number | string, Direccion: string, TipoDireccionId: number | string,
    MunicipioId: number | string, Colonia: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "user_update_profile",
      token: token,
      UsuarioId: UsuarioId,
      Identidad: Identidad,
      Usuario: Nombre,
      Telefono: Telefono,
      TipoTelefonoId: TipoTelefonoId,
      Email: Email,
      TipoCorreoId: TipoCorreoId,
      Direccion: Direccion,
      TipoDireccionId: TipoDireccionId,
      MunicipioId: MunicipioId,
      Colonia: Colonia
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al actualizar el usuario"))
      )
  }

  ChPass(Usuario: string, Clave: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "user_chpass", Usuario: Usuario, Clave: Clave })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al cambiar la clave de usuario"))
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
