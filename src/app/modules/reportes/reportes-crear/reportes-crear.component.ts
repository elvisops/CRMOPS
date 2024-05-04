import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportesListasService } from '../reportes-listas/reportes-listas.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-reportes-crear',
  templateUrl: './reportes-crear.component.html',
  styleUrls: ['./reportes-crear.component.css']
})
export class ReportesCrearComponent implements OnInit{

  carteraID: number = 0
  cartera: string = ''
  reporte: string = ''
  query: string = ''
  filtroFecha: boolean = false

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private service: ReportesListasService,
    private authService: AuthService

  ){}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.carteraID = params['carteraID']
      this.cartera = params['cartera']
    })
  }

  Crear(){
    if (this.reporte == "" || this.query == "") {
      this.service.notificacion('Los campos "Nombre del reporte" y "Query" son obligatorios')
      return
    }

    var filtroF 
    if (this.filtroFecha) {
      filtroF = 1
    }else{
      filtroF = 0
    }

    // para escapar las comillas en sql y en node-red
    this.query = this.query.replaceAll("'","''''")

    this.service.createReporte(this.carteraID,this.reporte,this.query,filtroF).subscribe(r => {
      var respuesta = this.authService.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      // console.log(respuesta)
      
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.Cancelar()  
      }else{
        this.service.notificacion(respuesta.message)
        this.query = this.query.replaceAll("''''","'")
      }
    })
  }

  Cancelar(){
    // console.log(this.carteraID)
    var carteraID = this.carteraID
    var cartera = this.cartera
    this.route.navigate([`reportes/reportes_listas`],{queryParams: {carteraID,cartera}})
  }
}
