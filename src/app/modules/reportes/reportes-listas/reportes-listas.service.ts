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
export class ReportesListasService {

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

  getListaReportes(carteraID:number): Observable<any> {
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      proc: 'reportes_lista',
      token: token,
      carteraID: carteraID,
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener la lista de carteras'))
      );
  }

  getDatos(query:string,fechaInicio:any,fechaFin:any): Observable<any> {
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      // proc: 'GENERAR_DATA_REPORTE',
      proc: 'GENERAR_DATA_REPORTE_FECHAS',
      token: token,
      query: query,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener datos del reporte'))
      );
  }

  getDatosFecha(query:string,fechaInicio:any,fechaFin:any): Observable<any> {
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      // proc: 'GENERAR_DATA_REPORTE',
      proc: 'GENERAR_DATA_REPORTE_FEC',
      token: token,
      query: query,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener datos del reporte'))
      );
  }

  generarReporte(datos: any[], nombreArchivo: string){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte')

    //encabezados
    const encabezados = Object.keys(datos[0])
    worksheet.addRow(encabezados)

    //filas de datos
    datos.forEach((dato) => {
      const fila: any[] = [];
      encabezados.forEach((encabezado) => {
        fila.push(dato[encabezado]);
      });
      worksheet.addRow(fila);
    });

    // crear excel
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      const url = window.URL.createObjectURL(blob);
      const enlace = document.createElement('a')
      enlace.href = url;
      enlace.download = `${nombreArchivo}.xlsx`
      enlace.click()
    })
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

