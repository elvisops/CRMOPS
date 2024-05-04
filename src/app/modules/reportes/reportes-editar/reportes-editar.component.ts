import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportesListasService } from '../reportes-listas/reportes-listas.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-reportes-editar',
  templateUrl: './reportes-editar.component.html',
  styleUrls: ['./reportes-editar.component.css']
})
export class ReportesEditarComponent implements OnInit{

  reporteID: number = 0
  reporte: string = ''
  query: string = ''
  filtroFecha: boolean|number = false
  carteraID: string = ''
  cartera: string = ''


  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private service: ReportesListasService,
    private authService: AuthService

  ){}
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.reporte = params['reporte']
      this.reporteID = params['reporteID']
      this.query = params['query']
      this.filtroFecha = params['filtroFecha']
      this.carteraID = params['carteraID']
      this.cartera = params['cartera']
    })

    this.query = this.query.replaceAll("''","'")

    if (this.filtroFecha == 1) {
      this.filtroFecha = true
    }else{
      this.filtroFecha = false
    }
  }

  SaveReporte(){
    // console.log("reporte id: ",this.reporteID," reporte: ",this.reporte, " query: ", this.query)

    if (this.query == "" || this.reporte == "") {
      this.service.notificacion('Los campos "Nombre del reporte" y"Query" son obligatorios')
      return
    }

    if (this.filtroFecha) {
      this.filtroFecha = 1
    }else{
      this.filtroFecha = 0
    }


    // para escapar las comillas en sql y en node-red
    this.query = this.query.replaceAll("'","''''")
    // console.log(this.query)

    this.service.updateReporte(this.reporte,this.reporteID,this.query,this.filtroFecha).subscribe(r => {
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
    this.route.navigate(['reportes/reportes_listas'],{queryParams: {carteraID,cartera}})
  }
}
