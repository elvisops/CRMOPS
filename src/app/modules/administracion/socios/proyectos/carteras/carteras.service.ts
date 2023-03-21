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

  getCarteras(ProyectoID:number):Observable<any>{
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc:'sp_carteras',
      token:token,
      ProyectoID:ProyectoID
    })
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener la lista de carteras"))
    )
  }

  getCarterasTipos():Observable<any>{
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc:'sp_carteras_tipos',
      token:token
    })
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener los tipos de carteras"))
    )
  }

  Create(ProyectoID:number, TipoCarteraID:number, NombreCartera:string){
    var token = this.auth.ParseToken()
    var payload = this.auth.mkpayload({
      proc:'carteras_create',
      token:token,
      ProyectoID:ProyectoID,
      TipoCarteraID:TipoCarteraID,
      NombreCartera:NombreCartera
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al obtener los tipos de carteras"))
    )
  }
  SendDataCuenta(data:any):Observable<any>{
    var payload = this.auth.encriptar(JSON.stringify(data)).toString()
    return this.http.post(`${this.api}/api/carteras/load/cuentas`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al manejar los datos enviados de cuentas"))
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
      console.log('Error en la aplicacion: ' + JSON.stringify(error));
      this.notificacion(operation)
      console.log(error)
      return of(result as T)
    }
  }

}
