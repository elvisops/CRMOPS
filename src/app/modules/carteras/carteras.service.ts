import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarterasService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) {}

  api = environment.api;

  getListaCarteras(): Observable<any> {
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      proc: 'CARTERAS_LISTAS_USUARIO',
      token: token,
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener la lista de carteras'))
      );
  }

  getListaCuentas(id:number,condicion:string,carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      proc: 'CUENTAS_LISTA',
      token: token,
      id: id,
      condicion: condicion,
      carteraID: carteraID,
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener la lista de cuentas'))
      );
  }

  notificacion(msg: string): void {
    this.snack.open(msg, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Error en la aplicacion: ' + JSON.stringify(error));
      this.notificacion(operation);
      console.log(error);
      return of(result as T);
    };
  }
}
