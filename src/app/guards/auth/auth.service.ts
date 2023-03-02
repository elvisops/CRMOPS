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

  get jsonFormatter():any{
    return {
      stringify: (cipherParams: any) => {
        const jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64), iv: null, s: null };
        if (cipherParams.iv) {
          jsonObj.iv = cipherParams.iv.toString();
        }
        if (cipherParams.salt) {
          jsonObj.s = cipherParams.salt.toString();
        }
        return JSON.stringify(jsonObj);
      },
      parse: (jsonStr:any) => {
        const jsonObj = JSON.parse(jsonStr);
        // extract ciphertext from json object, and create cipher params object
        const cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });
        if (jsonObj.iv) {
          cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        }
        if (jsonObj.s) {
          cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
        }
        return cipherParams;
      }
    };
  }

  encriptar(text:any){
    const key = environment.crypto_key
    text = text instanceof String ? text: JSON.stringify(text)
    const textEncripted = CryptoJS.AES.encrypt(text,key,
      {format:this.jsonFormatter, mode: CryptoJS.mode.CBC}).toString();
      return textEncripted
  }

  desencriptar(textEncripted:any):any{
    const key = environment.crypto_key
    const textDecripted = CryptoJS.AES.decrypt(textEncripted, key,
      {format: this.jsonFormatter}).toString(CryptoJS.enc.Utf8);
    return JSON.parse(textDecripted)
  }

  /*Cerrar sesion*/
  logout():void{
    sessionStorage.setItem('logged','false');
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('permisos')
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
