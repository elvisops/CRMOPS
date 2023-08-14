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
export class ContactoCorreosService {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private auth: AuthService,
  ) { }

  api = environment.api

  
  getListaTiposCorreos(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "tipos_correos_lista", token: token })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("No se pudo obtener la lista de municipios"))
      )
  }

  Guardar(personaID: number,correo:string, tipoCorreoID:number): Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "correos_create",
      token: token,
      personaID: personaID,
      correo: correo,
      tipoCorreoID: tipoCorreoID, 
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al intentar agregar el telefono"))
    )
  }

  Editar(personaID:number,correoID:number,correo:string, tipoCorreoID:number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "correos_update",
      token: token,
      personaID:personaID,
      correoID:correoID,
      correo: correo,
      tipoCorreoID:tipoCorreoID,
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


