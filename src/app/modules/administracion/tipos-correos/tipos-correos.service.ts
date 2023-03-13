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
export class TiposCorreosService {
  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private snack:MatSnackBar
  ) { }

  api = environment.api


  // Crear(modulo:string,descripcion:string):Observable<any>{
  //   var token = sessionStorage.getItem('token')
  //   var payload = this.auth.mkpayload({
  //       proc:"socios_create",
  //       token:token,
  //       modulo:modulo,
  //       descripcion:descripcion        
  //     })
  //   return this.http.post<any>(`${this.api}/api/proc`,{payload})
  //   .pipe(
  //     tap(),
  //     catchError(this.handleError("Error al leer la lista de Socios"))
  //   )
  // }

  // update(socioID:number, socio:string, descripcion:string):Observable<any>{
  //   var token = sessionStorage.getItem('token')
  //   var payload = this.auth.mkpayload({

  //     proc:"socios_update",
  //     token:token,
  //     socioID:socioID,
  //     socio:socio,
  //     descripcion:descripcion
  //   })
  //   return this.http.post<any>(`${this.api}/api/proc`,{payload})
  //   .pipe(
  //     tap(),
  //     catchError(this.handleError("Error al Modificar el socio"))
  //   )
  // }

//Llamado de proc para listar tipos correos

getListaTcorreos():Observable<any>{
  var token = sessionStorage.getItem('token')
  token = this.auth.desencriptar(token)
  var payload = this.auth.mkpayload({proc:"tipos_correos_lista",token:token})
  return this.http.post<any>(`${this.api}/api/get`,{payload})
  .pipe(
    tap(),
    catchError(this.handleError("Error al leer la lista de tipos de correos"))
  )
}




//manejo de errores mensaje
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
