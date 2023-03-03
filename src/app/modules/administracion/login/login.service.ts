import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpRequest } from './httprequest.interface';
import { HttpResponse } from './httpresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = environment.api;

  DataSend:HttpRequest = {proc:"",payload:""};
  
  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private snack:MatSnackBar
  ) { }

  mkpayload(data:any){
    /*Crea el objeto para ejecutar el procedimiento almacenado desde el API Server*/
    /*OJO*/
    /*Matener el orden de ejecucion de las variables del procedimiento de la base de
    datos desde la interfaz*/
    data = this.auth.encriptar(JSON.stringify(data)).toString();
    return data;
  }


  login(usuario:string,password:string):Observable<any>{
    var payload = this.mkpayload({proc:"user_auth",usuario:usuario,password:password})
    return this.http.post<any>(`${this.api}/api/proc`,{proc:"login",payload:payload})
            .pipe(
              tap(),
              catchError(this.handleError("Error al iniciar la sesion"))
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
      console.log(error)
      return of(result as T)      
    }
  }

}
