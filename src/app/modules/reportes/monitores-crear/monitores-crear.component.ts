import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitoresListasService } from '../monitores-listas/monitores-listas.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-monitores-crear',
  templateUrl: './monitores-crear.component.html',
  styleUrls: ['./monitores-crear.component.css']
})
export class MonitoresCrearComponent implements OnInit{

  carteraID: number = 0
  cartera: string = ''
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
      this.carteraID = params['carteraID']
      this.cartera = params['cartera']
    })
  }

  Crear(){

    // console.log(this.tipoMonitor)
    if (this.query == "" || this.monitor == "" || this.tipoMonitor == undefined) {
      this.service.notificacion('Los campos "Nombre del monitor", "Query" y "Tipo de monitor" son obligatorios')
      return
    }

    this.query = this.query.replaceAll("'","''")

    this.service.createMonitor(this.carteraID, this.monitor,this.query,this.tipoMonitor).subscribe(r => {
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
    this.route.navigate([`reportes/monitores_listas`],{queryParams: {carteraID,cartera}})
  }
}
