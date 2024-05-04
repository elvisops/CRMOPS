import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api


  Crear(modulo: string, descripcion: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    var payload = this.auth.mkpayload({proc: "socios_create",token: token,modulo: modulo,descripcion: descripcion})
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer la lista de Socios"))
      )
  }

  update(socioID: number, socio: string, descripcion: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    var payload = this.auth.mkpayload({
      proc: "socios_update",
      token: token,
      socioID: socioID,
      socio: socio,
      descripcion: descripcion
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al Modificar el socio"))
      )
  }

  getNameSocio(SocioID: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'SOCIOS_GET_NAME',
      token: token,
      SocioID: SocioID
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener el nombre de socio"))
      )
  }

  CrearContacto(SocioID: number, Nombre: string, Telefono: string, Correo: string, Descripcion: string, Puesto: string): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: "socios_contactos_create",
      token: token,
      SocioID: SocioID,
      Nombre: Nombre,
      Telefono: Telefono,
      Correo: Correo,
      Puesto: Puesto,
      Descripcion: Descripcion
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al crear el contacto"))
      )
  }

  EditContacto(SocioContactoID: number, Nombre: string, Telefono: string, Correo: string, Descripcion: string, Puesto: string): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: "socios_contactos_edit",
      token: token,
      SocioContactoID: SocioContactoID,
      Nombre: Nombre,
      Telefono: Telefono,
      Correo: Correo,
      Puesto: Puesto,
      Descripcion: Descripcion
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al editar el contacto"))
      )
  }

  DeleteContacto(SocioContactoID: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: "socios_contactos_delete",
      token: token,
      SocioContactoID: SocioContactoID
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al eliminar el contacto"))
      )
  }

  CrearProyecto(SocioID: number, Proyecto: string): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'socios_proyectos_create',
      token: token,
      SocioID: SocioID,
      Proyecto: Proyecto
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al crear el nuevo proyecto"))
      )
  }

  UpdateProyecto(ProyectoID: number, Proyecto: string): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'SOCIOS_PROYECTOS_UDPATE',
      token: token,
      ProyectoID: ProyectoID,
      Proyecto: Proyecto
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al crear el nuevo proyecto"))
      )
  }

  //Llamado de proc para listar socios

  getListaSocios(): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: "socios_lista", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al leer la lista de socios"))
      )
  }

  getSociosContacts(SocioID: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: 'sp_socios_contactos', token: token, SocioID: SocioID })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de contactos"))
      )
  }

  getSociosProyectos(SocioID: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: 'sp_socios_proyectos', token: token, SocioID: SocioID })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de proyectos"))
      )
  }

  getUsuariosCarteras(carteraID: number): Observable<any>{
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: 'usuarios_carteras_lista', token: token, carteraID: carteraID })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de usuarios de la cartera"))
      )
  }

  getUsuariosCarterasDisponibles(carteraID: number): Observable<any>{
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({ proc: 'usuarios_carteras_dispo_lista', token: token, carteraID: carteraID })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de usuarios"))
      )
  }

  updatePermisoUsuario(usuarioID: number, proyectoID: number): Observable<any>{
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'usuarios_carteras_update', 
      token: token,
      usuarioID: usuarioID,
      // estadoUsuario: estadoUsuario,
      proyectoID: proyectoID
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo actualizar el permiso del usuario"))
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
