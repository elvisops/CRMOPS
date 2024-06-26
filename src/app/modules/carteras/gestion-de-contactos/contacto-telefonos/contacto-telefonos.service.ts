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
export class ContactoTelefonosService {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private auth: AuthService,
  ) { }

  api = environment.api

  getListaTiposTelefonos(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "tipos_telefonos_lista", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de tipos de telefonos"))
      )
  }

  GuardarTelefono(personaID:number,telefono:string,tipoTelefonoID:number,sms:number,ivr:number): Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "telefonos_create",
      token: token,
      personaID:personaID,
      telefono:telefono,
      tipoTelefonoID: tipoTelefonoID,
      sms:sms,
      ivr:ivr
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al intentar agregar el telefono"))
    )
  }

  EditarTelefono(personaID:number,telefonoID:number,telefono:string,tipoTelefonoID:number,sms:number,ivr:number): Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "telefonos_update",
      token: token,
      personaID:personaID,
      telefonoID:telefonoID,
      telefono:telefono,
      tipoTelefonoID: tipoTelefonoID,
      sms:sms,
      ivr:ivr
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
      console.log('Error en la aplicacion: ' + JSON.stringify(error))
      this.notificacion(operation)
      console.log(error)
      return of(result as T)
    }
  }
}


