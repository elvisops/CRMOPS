import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import * as ExcelJS from 'exceljs';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar,
  ) { }

  api = environment.api;

  getDatos(){
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);

    // SELECT * FROM CARTERAS_CUENTAS WHERE CARTERAID = 4029;
    var query = 'SELECT * FROM CARTERAS_CUENTAS WHERE CARTERAID = 4029;'
    var columnas = '*'
    var tabla = 'CARTERAS_CUENTAS'
    var condicion = 'WHERE CARTERAID = 4029'

    var payload = this.auth.mkpayload({
      proc: 'GENERAR_DATA_REPORTE',
      token: token,
      query: query,
      columnas:columnas,
      tabla:tabla,
      condicion:condicion
    });
    return this.http
      .post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener la lista de cuentas'))
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
