import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,  RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean
  {
    
    if(!this.VerificarEstado()){
      this.router.navigate(['./login'])
      console.log("no hay sesion valida")
      return false;  
      
    }else{
      return true;
    }

  }

  public VerificarEstado():boolean{
    let EstadoSesion = false;
    EstadoSesion = (sessionStorage.getItem('logged')=="true" || sessionStorage.getItem('logged') != undefined)?true:false;
    return EstadoSesion;
  }
  
  
}
