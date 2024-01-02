import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';
import * as ExcelJS from 'exceljs';
@Injectable({
  providedIn: 'root'
})
export class TiempoPantallaService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar,
  ) { }

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

  getTiempoPantalla(carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      // proc: 'GENERAR_DATA_REPORTE',
      proc: 'tiempo_pantalla_get',
      token: token,
      carteraID: carteraID,//cambio reciente
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener los tiempos de pantallas'))
      );
  }

  updateTiempo(creacion:number, gestion:number,carteraID:number){
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      // proc: 'GENERAR_DATA_REPORTE',
      proc: 'tiempo_pantalla_update',
      token: token,
      creacion:creacion,
      gestion: gestion,
      carteraID: carteraID,
    });
    return this.http
      .post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener los tiempos de pantallas'))
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
