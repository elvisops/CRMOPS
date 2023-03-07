import { Component, OnInit } from '@angular/core';
import { LoginService } from '../administracion/login/login.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit{
  
  permisos:any = []
  modulos:any =[]
  
  constructor(
    private loginService:LoginService
  ){}


  ngOnInit(): void {
    this.permisos = this.loginService.leerPermisos()    
    this.getModulos()
  }

  getModulos(){
    if(this.permisos != undefined && this.permisos != null){
      this.modulos = new Set(this.permisos.map((e:any) => e.MODULO))
    }
  }


}
