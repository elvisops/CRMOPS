import { Component, OnInit } from '@angular/core';
import { TimerServiceService } from 'src/app/timer-service.service';
import { LoginService } from '../administracion/login/login.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit{
  
  permisos:any = []
  modulos:any =[]

  elapsedTime?: number;
  
  constructor(
    private loginService:LoginService,
    private timerService: TimerServiceService
  ){}


  ngOnInit(): void {
    this.permisos = this.loginService.leerPermisos()    
    this.getModulos()
    // // timer
    // this.timerService.startTimer();
    // setInterval(() => {
    //   this.elapsedTime = this.timerService.getElapsedTime();
    // }, 500);
  }

  getModulos(){
    if(this.permisos != undefined && this.permisos != null){
      this.modulos = new Set(this.permisos.map((e:any) => e.MODULO))
    }
  }


}
