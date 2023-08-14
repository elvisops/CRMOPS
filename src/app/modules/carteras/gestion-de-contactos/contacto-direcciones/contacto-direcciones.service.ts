import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoDireccionesService {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private auth: AuthService,
  ) { }

  api = environment.api

  getListaTiposMunicipio(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "municipios_lista", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de municipios"))
      )
  }

  getListaTiposTiposDirecciones(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "tipos_direcciones_lista", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de municipios"))
      )
  }

  Guardar(personaID:number,direccion:string, municipioID:number, colonia:string, tipoDireccionID:number): Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "direcciones_create",
      token: token,
      personaID: personaID,
      direccion: direccion, 
      municipioID: municipioID, 
      colonia: colonia, 
      tipoDireccionID:tipoDireccionID
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al intentar agregar el telefono"))
    )
  }

  Editar(personaID:number, direccion:string, municipioID:number, colonia:string, tipoDireccionID:number, direccionID: number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "direcciones_update",
      token: token,
      personaID:personaID,
      direccion:direccion,
      municipioID: municipioID,
      colonia:colonia,
      tipoDireccionID:tipoDireccionID,
      direccionID:direccionID
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al intentar agregar el telefono"))
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
      console.log('Error en la aplicacion: ' + JSON.stringify(error))
      this.notificacion(operation)
      console.log(error)
      return of(result as T)
    }
  }
}

