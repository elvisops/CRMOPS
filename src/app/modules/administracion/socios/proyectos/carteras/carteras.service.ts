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
export class CarterasService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  api = environment.api

  getCarteras(ProyectoID: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'sp_carteras',
      token: token,
      ProyectoID: ProyectoID
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de carteras"))
      )
  }

  getCarterasTipos(): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'sp_carteras_tipos',
      token: token
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener los tipos de carteras"))
      )
  }

  Proc(paquete: string): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'CARTERA_CREATE_CUENTA',
      paquete: paquete,
      token: token
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener los tipos de carteras"))
      )
  }

  Create(ProyectoID: number, TipoCarteraID: number, NombreCartera: string) {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'carteras_create',
      token: token,
      ProyectoID: ProyectoID,
      TipoCarteraID: TipoCarteraID,
      NombreCartera: NombreCartera
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener los tipos de carteras"))
      )
  }


  SendDataCuenta(data: any): Observable<any> {
    var dataString = JSON.stringify(data)
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'TEMP_CARGA_CARTERA_LOTE',
      token: token,
      data: dataString
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al cargar la cartera"))
      )
  }

  CreateTableDetalles(encabezados: string, CarteraID: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'CARTERAS_TABLA_DETALLES',
      token: token,
      data: encabezados,
      CarteraID: CarteraID
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al cargar la cartera"))
      )
  }

  // k
  PaqueteDB(paquete: any): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      // proc:'CARTERAS_TABLA_DETALLES',      
      token: token,
      paquete: paquete,
    })
    return this.http.post<any>(`${this.api}/api/carteras/load/cuentas`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al cargar las cuentas"))
      )
  }

  //prueba
  prueba(datos: any): Observable<any> {
    return this.http.post<any>(`http://10.8.8.115:3002/procesar-json`, datos)
      .pipe(
        tap(),
        catchError(this.handleError("Error las cuentas"))
      )
  }


  crearTabla(datos: any, carteraID: number): Observable<any> {
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc: 'TABLA_CUENTAS_CREATE',
      token: token,
      datos: datos,
      carteraID: carteraID,
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al cargar la cartera"))
      )
  }


  insertarDatosTabla(datos: any, miParametro: string,identidad: string,nombre: string,
    cuenta: string,telefono: string,telefonoTrabajo: string): Observable<any> {
    var token = this.auth.ParseToken()
    const url = `http://10.8.8.115:3002/procesar-json?token=${token}&nombreTabla=${miParametro}&identidad=${identidad}&nombre=${nombre}&cuenta=${cuenta}&telefono=${telefono}&telefonoTrabajo=${telefonoTrabajo}`;
    
    return this.http.post<any>(url, datos)
      .pipe(
        tap(),
        catchError(this.handleError("Error al cargar las cuentas"))
      );
  }
  
  
  //
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
