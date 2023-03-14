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
export class RolesService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }


  api = environment.api

  getListaRoles(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ proc: "roles_lista", token:token })
    // ´$this.api´ = objeto literal
    return this.http.post<any>(`${this.api}/api/get`,{ payload })
      .pipe(//pipe solo tiene 2 caminos, si todo esta bien pasa por un lado, si existe error por otro camino
        tap(), //lo extrae y lo mueve al siguiente observador 
        catchError(this.handleError("Error al leer la lista de roles"))//this.handleError para leer el error que viene a nivel de http 
      )
  }

  //funcon utilizada por el dialog de crear
  Crear(rol:string, descripcion:string):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({ 
      proc: "roles_create", 
      token:token,
      rol: rol,
      descripcion: descripcion
    })

    return this.http.post<any>(`${this.api}/api/proc`,{ payload })
      .pipe(//pipe solo tiene 2 caminos, si todo esta bien pasa por un lado, si existe error por otro camino
        tap(), //lo extrae y lo mueve al siguiente observador 
        catchError(this.handleError("Error al leer la lista de roles"))//this.handleError para leer el error que viene a nivel de http 
      )
  }

  Update(rolId:number, rol:string, estado:boolean, descripcion:string):Observable<any>{
    var estadodb = (estado)?'1':'0'
    var token = sessionStorage.getItem('token')
    var payload = this.auth.mkpayload({
      proc: "roles_update",
      token:token,
      rolId:rolId,
      rol:rol,
      estado:estadodb,
      descripcion:descripcion
    })
    return this.http.post<any>(`${this.api}/api/proc`,{ payload })
    .pipe(
      tap(),
      catchError(this.handleError("Error al modificar el Rol"))
    )
  }

  notificacion(msg:string):void {
    this.snack.open(msg, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000
    })
  }

  private handleError<T>(operation = 'operacion', result?:T) {
    return (error:any): Observable<T>=>{
      console.log('Error en la aplicacion: ' + JSON.stringify(error));
      this.notificacion(operation)
      console.log(error)
      return of(result as T)
    }
  }
}

