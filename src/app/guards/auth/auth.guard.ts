import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
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
      return false;  
    }else{
      return true;
    }

  }

  public VerificarEstado():boolean{
    let EstadoSesion = false;
    EstadoSesion = (sessionStorage.getItem('logged')=="true")?true:false;
    return EstadoSesion;
  }
  
  
}
