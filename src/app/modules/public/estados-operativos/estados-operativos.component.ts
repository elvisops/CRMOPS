import { Component,OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { EstadosOperativosService } from './estados-operativos.service';
import { LoginService } from 'src/app/modules/administracion/login/login.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-estados-operativos',
  templateUrl: './estados-operativos.component.html',
  styleUrls: ['./estados-operativos.component.css']
})
export class EstadosOperativosComponent implements  OnInit{
  // @Input() variableCompartida: string = "Texto compartido";

  constructor(
    private auth:AuthService,
    private service:EstadosOperativosService,
    private loginService:LoginService,
    private _bottomSheet: MatBottomSheet
  ) { }

  EstadosOperativos: any[] = []
  EstadoActual:number = 0
  EstadoActualName = ""

  openlink(event: MouseEvent){  
      
    event.preventDefault();
  } 

  ListarEstadosOperativos(){

    var EstadoActual = sessionStorage.getItem('EstadoOperativo')
    
     var estadoSesion = this.auth.desencriptar(EstadoActual)
     this.EstadoActual = estadoSesion
    this.service.getEstadosOperativos().subscribe(res=>{      
      var respuesta = this.auth.desencriptar(res.data)
      respuesta = JSON.parse(respuesta)
      var ArrFiltro = respuesta.filter((elemento:any) => elemento.ESTADOOPERATIVOID != estadoSesion);
      var NombreEstado = respuesta.filter((elemento:any) => elemento.ESTADOOPERATIVOID == estadoSesion);
      this.EstadoActualName = NombreEstado[0].ESTADOOPERATIVO
      this.EstadosOperativos = ArrFiltro      
    })    
  }

  ActualizarEstado(estadoOperativoID:number):void{
    this.service.SetUserState(estadoOperativoID).subscribe(res=>{
      var respuesta = this.auth.desencriptar(res.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        sessionStorage.setItem('EstadoOperativo',this.auth.encriptar(estadoOperativoID.toString()).toString())        
        this.service.notificacion("Estado operativo actualizado")     
        this._bottomSheet.dismiss();
           
      }else{
        this.service.notificacion("Error al actualizar el estado operativo")
      }      
    })
    
  }


  ngOnInit(): void {    
    this.ListarEstadosOperativos()
  }

}
