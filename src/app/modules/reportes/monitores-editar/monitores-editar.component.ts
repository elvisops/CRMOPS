import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportesListasService } from '../reportes-listas/reportes-listas.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MonitoresListasService } from '../monitores-listas/monitores-listas.service';

@Component({
  selector: 'app-monitores-editar',
  templateUrl: './monitores-editar.component.html',
  styleUrls: ['./monitores-editar.component.css']
})
export class MonitoresEditarComponent implements OnInit{

  cartera: string = ''
  carteraID: number = 0
  monitorID: number = 0
  monitorDetalle: any
  monitor: string = ''
  query: string = ''
  tipoMonitor: any

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private service: MonitoresListasService,
    private authService: AuthService

  ){}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.cartera = params['cartera']
      this.monitorID = params['monitorID']
      this.carteraID = params['carteraID']
    })

    if (this.monitorID || this.monitorID != undefined) {
      this.genMonitorInfo()
    }
  }

  genMonitorInfo(){
    this.service.getMonitor(this.monitorID).subscribe(r => {
      var data = this.authService.desencriptar(r.data)

      data = JSON.parse(data)
      data = data[0]
      this.monitorDetalle = data
      this.monitor = this.monitorDetalle.MONITOR
      this.query = this.monitorDetalle.QUERY
      this.tipoMonitor = this.monitorDetalle.GRAFICO     
    })
  }  

  actualizarMonitor(){

    console.log(this.tipoMonitor)
    if (this.query == "" || this.monitor == "" || this.tipoMonitor == undefined) {
      this.service.notificacion('Los campos "Nombre del monitor", "Query" y "Tipo de monitor" son obligatorios')
      return
    }


    this.query = this.query.replaceAll("'","''")

    this.service.updateMonitor(this.monitor,this.monitorID,this.query,this.tipoMonitor).subscribe(r => {
      var respuesta = this.authService.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.Cancelar()
      }else{
        this.service.notificacion(respuesta.message)
        this.query = this.query.replaceAll("''","'")
      }
    })
  }

  Cancelar(){
    var carteraID = this.carteraID
    var cartera = this.cartera
    this.route.navigate(['reportes/monitores_listas'],{queryParams:{carteraID,cartera}})
  }
}
