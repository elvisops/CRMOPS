import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs'
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GestionDeContactosService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar,
  ) { }

  api = environment.api
  private apiUrl = 'http://10.8.8.115:3003/api';

  savePantalla(pantalla: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'usuario_en_pantalla_save',
      token: token,
      pantalla: pantalla
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al salvar en que pantalla se encuentra"))
      )
  }

  removeUserPantalla(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'usuario_en_pantalla_remove',
      token: token
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al remover la pantalla en la que se encuentra el usuario"))
      )
  }

  getTiempoPantalla(carteraID: number, pantalla: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "traer_tiempo_pantalla",
      token: token,
      pantalla: pantalla,
      carteraID: carteraID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener el tiempo de pantalla"))
      )
  }

  getDatosCliente(cuentaID: number, carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "DATOS_CLIENTE",
      token: token,
      cuentaID: cuentaID,
      carteraID: carteraID,
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener los datos del cliente"))
      )
  }

  getDetalles(cuentaID: number, carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "DETALLES_LISTA",
      token: token,
      cuentaID: cuentaID,
      carteraID: carteraID,
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de Detalles"))
      )
  }

  getPestaniaUno(cuentaID: number, carteraID: number, cuenta: string): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "PESTAÑA_UNO_LISTA",
      token: token,
      cuentaID: cuentaID,
      carteraID: carteraID,
      cuenta: cuenta
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de Detalles"))
      )
  }

  getDetallesATC(cuentaID: number, carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "DETALLES_LISTA_ATC",
      token: token,
      cuentaID: cuentaID,
      carteraID: carteraID,
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de Detalles"))
      )
  }

  // getListaGestiones(cuentaID:number):Observable<any>{
  getListaHistorial(cuentaID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "HISTORIAL_LISTA",
      token: token,
      cuentaID: cuentaID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de gestiones"))
      )
  }

  getListaTelefonos(cuentaID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "TELEFONOS_CUENTA_LISTA",
      token: token,
      cuentaID: cuentaID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de telefonos"))
      )
  }

  updateSMS(telefonoID: number, smsValue: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "telefono_update_sms",
      token: token,
      telefonoID: telefonoID,
      smsValue: smsValue
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al intentar actualizar el telefono"))
      )
  }

  updateIVR(telefonoID: number, ivrValue: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "telefono_update_ivr",
      token: token,
      telefonoID: telefonoID,
      ivrValue: ivrValue
    })
    return this.http.post<any>(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al intentar actualizar el telefono"))
      )
  }

  getOpcionesRazonMora(carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "OPCIONES_RAZON_MORA_LISTA",
      token: token,
      carteraID: carteraID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de telefonos"))
      )
  }

  getListaDirecciones(cuentaID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "DIRECCIONE_CUENTA_LISTA",
      token: token,
      cuentaID: cuentaID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de direcciones"))
      )
  }

  // CORREO_CUENTA_LISTA
  getListaCorreos(cuentaID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "CORREO_CUENTA_LISTA",
      token: token,
      cuentaID: cuentaID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de correos"))
      )
  }

  getListaCambios(personaID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "CONTROL_CAMBIOS_LISTA",
      token: token,
      personaID: personaID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de correos"))
      )
  }

  getListaPromesas(cuentaId: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "PROMESAS_LISTA",
      token: token,
      cuentaId: cuentaId
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de gestiones"))
      )
  }

  getListaConfirmaciones(cuentaId: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "CONFIRMACIONES_LISTA",
      token: token,
      cuentaId: cuentaId
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de gestiones"))
      )
  }

  getListaPlantillasSMS(carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "PLANTILLAS_SMS_LISTA",
      token: token,
      carteraID: carteraID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de gestiones"))
      )
  }

  getListaRazonMora(cuentaId: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "GESTION_RAZON_MORA_LISTA",
      token: token,
      cuentaId: cuentaId
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de gestiones"))
      )
  }

  getListaPagos(cuentaId: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "PAGOS_LISTA",
      token: token,
      cuentaId: cuentaId
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de gestiones"))
      )
  }

  getListaAcciones(carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "ACCIONES_LISTA",
      token: token,
      carteraID: carteraID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de acciones"))
      )
  }

  getListaTipificaciones(carteraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "TIPIFICACIONES_LISTA",
      token: token,
      carteraID: carteraID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de tipificaciones"))
      )
  }

  getListaResultados(accionID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "RESULTADOS_LISTA",
      token: token,
      accionID: accionID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de resultados"))
      )
  }

  getListaSubTipificaciones(tipificacionID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "SUBTIPIFICACIONES_LISTA",
      token: token,
      tipificacionID: tipificacionID
    })
    return this.http.post(`${this.api}/api/get`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al obtener la lista de subtipificaciones"))
      )
  }

  GuadarGestion(telefonoID: number, cuentaID: number, resultadoID: number, subtipificacionID: number, observacion: string, razonMoraID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "GESTIONES_CREATE",
      token: token,
      telefonoID: telefonoID,
      cuentaID: cuentaID,
      resultadoID: resultadoID,
      subtipificacionID: subtipificacionID,
      observacion: observacion,
      razonMoraID: razonMoraID,
    })
    return this.http.post(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al guardar la gestion"))
      )
  }

  GuadarGestionATCTimeOut(carteraID: number, cuentaID: number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "GESTIONES_CREATE_ATC_TIMEOUT",
      token: token,
      carteraID: carteraID,
      cuentaID: cuentaID,
      // razonMoraID:razonMoraID,
    })
    return this.http.post(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al guardar la gestion timeout"))
      )
  }

  GuadarGestionATC(telefonoID: number, cuentaID: number, resultadoID: number, subtipificacionID: number, llamadaEfectiva: number|null, observacion: string,telefono: string,existeLlamada:number): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "GESTIONES_CREATE_ATCV2",
      token: token,
      telefonoID: telefonoID,
      cuentaID: cuentaID,
      resultadoID: resultadoID,
      subtipificacionID: subtipificacionID,

      observacion: observacion,
      llamadaEfectiva: llamadaEfectiva,
      telefono: telefono,
      existeLlamada: existeLlamada
      // razonMoraID:razonMoraID,
    })
    return this.http.post(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al guardar la gestion"))
      )
  }

  GuadarPromesa(gestionID: number, valorPromesa: string, fechaPromesa: Date | null): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "PROMESAS_CREATE",
      token: token,
      gestionID: gestionID,
      valorPromesa: valorPromesa,
      fechaPromesa: fechaPromesa,
    })
    return this.http.post(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al guardar la gestion"))
      )
  }

  CallBack(cuentaID: number, fechaProximaGestion: Date | null): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "callback_create",
      token: token,
      cuentaID: cuentaID,
      fechaProximaGestion: fechaProximaGestion,
    })
    return this.http.post(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al guardar la gestion"))
      )
  }

  SiguienteContacto(): Observable<any> {
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: "siguiente_contacto",
      token: token
    })
    return this.http.post(`${this.api}/api/proc`, { payload })
      .pipe(
        tap(),
        catchError(this.handleError("Error al traer el siguiente contacto"))
      )
  }

  traerChatWhat(telefono: any): Observable<any> {
    // return this.http.get(`https://panel.rapiwha.com/get_messages.php?apikey=Z0BY2NGRRVUH5S69PMUC&number=504${telefono}`)
    // .pipe(
    //   tap(),
    //   catchError(this.handleError("Error al traer el siguiente contacto"))
    // )
    return this.http.get(`${this.apiUrl}/get_messages.php?apikey=Z0BY2NGRRVUH5S69PMUC&number=504${telefono}`);

  }

  enviarMensajeWhat(telefono: any, texto: string): Observable<any> {
    // https://panel.rapiwha.com/send_message.php?apikey=Z0BY2NGRRVUH5S69PMUC&number=50499287403&text=MyText

    return this.http.get(`https://panel.rapiwha.com/send_message.php?apikey=Z0BY2NGRRVUH5S69PMUC&number=504${telefono}&text=${texto}`)
  }

  getPrefijo(carteraID: number):Observable<any>{
    var token = sessionStorage.getItem('token')
    token = this.auth.desencriptar(token)
    var payload = this.auth.mkpayload({
      proc: 'prefijo_cartera_get',
      token: token,
      carteraID: carteraID
    })
    return this.http.post<any>(`${this.api}/api/get`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError('Error al obtener el prefijo de la cartera'))
    )
  }
  llamar(telefonoSeleccionado:any,extencion: any, codigo: any): Observable<any> {
    // const data = {
    //   codigo: codigo,
    //   extension: extencion,
    //   telefono: telefonoSeleccionado,
    //   transaccion: '12349'
    // };



    return this.http.get(`http://10.8.8.100/crmcall.php?codigo=${codigo}&extension=${extencion}&telefono=${telefonoSeleccionado}`)
    .pipe(
      tap(),
      catchError(this.handleError("Error al realizar la llamada"))
    )
    // return this.http.post<any>('http://10.8.8.115:3006/api-llamadas-dms', data)
    // .pipe(
    //   tap(),
    //   catchError(this.handleError('Error al realizar la llamada'))
    // );
  }

  notificacion(msg: string): void {
    this.snack.open(msg, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
      panelClass: 'app-notification-success'

    })
  }

  notificacionError(msg: string): void {
    this.snack.open(msg, "Cerrar", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 5000,
      panelClass: 'app-notification-error'

    })
  }

  // notificacionError(msg: string): void {
  //   const config: MatSnackBarConfig<any> = {
  //     horizontalPosition: 'center',
  //     verticalPosition: 'top',
  //     duration: 50000,
  //     panelClass: ['snackbar-error'] // Agregar una clase personalizada
  //   };

  //   this.snack.open(msg, 'Cerrar', config);
  // }

  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Error en la aplicacion: ' + JSON.stringify(error));
      console.log(error)
      return of(result as T)
    }
  }
}



