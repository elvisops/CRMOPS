import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private snack:MatSnackBar) { }

  api = environment.api
  

  encriptar(text:any){
    return CryptoJS.AES.encrypt(text,environment.crypto_key);
  }

  desencriptar(textEncripted:any):any{
    var info = CryptoJS.AES.decrypt(textEncripted,environment.crypto_key);
    var respuesta = info.toString(CryptoJS.enc.Utf8)
    return respuesta
  }

  mkpayload(data:any){
    /*Crea el objeto para ejecutar el procedimiento almacenado desde el API Server*/
    /*OJO*/
    /*Matener el orden de ejecucion de las variables del procedimiento de la base de
    datos desde la interfaz*/
    data = this.encriptar(JSON.stringify(data)).toString();
    return data;
  }
  

  notificacion(msg:string):void{
    this.snack.open(msg,"Cerrar",{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration:5000
    })
  }

  private handleError<T>(operation = 'operation',result?:T){
    return (error:any):Observable<T>=>{
      console.log('Error en la aplicacion'+JSON.stringify(error));
      this.notificacion('Error en la aplicacion: '+operation)
      return of(result as T);
    }
  }



}
