import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar,
  ) { }

  api = environment.api;

  GuardarColaTrabajo(Data: any):Observable<any>{
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    var payload = this.auth.mkpayload({
      // proc: 'COLA_TRABAJO_CREATE',
      // token: token,
      Data: Data
    })
    return this.http.post<any>(`${this.api}/api/createCola`,{ payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error al guardar la cola de trabajo"))
    )
    
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
