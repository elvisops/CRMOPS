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
export class TiposProductosService {
  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private snack:MatSnackBar
  ) { }  

  api = environment.api
    
  getListaTproductos():Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({proc:"tipos_productos_lista",token:token})
    return this.http.post<any>(`${this.api}/api/get`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de Tipos de Productos"))
    )
  }

  Crear(tipoProducto:string,descripcion:string):Observable<any>{
    var token = sessionStorage.getItem('token')
    var payload = this.auth.mkpayload({
        proc:"tipos_productos_create",
        token:token,
        tipoProducto:tipoProducto,
        descripcion:descripcion        
      })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al leer la lista de Tipos de Productos"))
    )
  }

  update(tipoProductoID:number, tipoProducto:string, descripcion:string):Observable<any>{
    var token = sessionStorage.getItem('token')
    var payload = this.auth.mkpayload({

      proc:"tipos_productos_update",
      token:token,
      tipoProductoID:tipoProductoID,
      tipoProducto:tipoProducto,
      descripcion:descripcion
    })
    return this.http.post<any>(`${this.api}/api/proc`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al Modificar el Producto"))
    )
  }

  

  notificacion(msg:string):void{
    this.snack.open(msg,"Cerrar",{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration:5000
    })
  }

  private handleError<T>(operation = 'operacion', result?:T){
    return(error:any):Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error));
      this.notificacion(operation)
      console.log(error)
      return of(result as T)      
    }
  }
}
