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
export class ContactoConfirmacionesService {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private auth: AuthService,
  ) { }

  api = environment.api

  GuardarConfirmacion(cuentaID:number,fecha:Date,monto:string): Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "confirmaciones_create",
      token: token,
      cuentaID: cuentaID, 
      monto:monto,
      fecha:fecha,
      
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al intentar agregar la confirmacion"))
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


