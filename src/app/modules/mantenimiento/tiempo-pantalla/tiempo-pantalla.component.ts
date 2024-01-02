import { Component, OnInit, ViewChild } from '@angular/core';
import { TiempoPantallaService } from './tiempo-pantalla.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CarterasListas } from './tiempo-pantalla';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tiempo-pantalla',
  templateUrl: './tiempo-pantalla.component.html',
  styleUrls: ['./tiempo-pantalla.component.css']
})
export class TiempoPantallaComponent implements OnInit{


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: TiempoPantallaService,
    private auth: AuthService,
    private dialog: MatDialog,
    private route: Router
  ){}

  ListaCarteras: CarterasListas[] = []
  DataSource: MatTableDataSource<CarterasListas> = new MatTableDataSource()
  Columnas: string[] = ["PROYECTO", "CARTERA", "TIPOCARTERA", "OPCIONES"]
  tabla: boolean = false
  creacion: number  = 0
  gestion: number  = 0
  carteraID: number = 0




  ngOnInit(): void {
    this.genListaCarteras()    
  }


  genListaCarteras() {
    this.service.getListaCarteras().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaCarteras = JSON.parse(data)
      this.FillTable<CarterasListas>(this.ListaCarteras, this.DataSource, this.sort, this.paginator)

    })
  }

  verTiemposPantalla(carteraID: number){
    this.carteraID = carteraID
    this.service.getTiempoPantalla(carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      data = JSON.parse(data)
      this.tabla = true
      this.creacion = data[0].CREAR
      this.gestion = data[0].GESTION

      console.log("creacion ",this.creacion ,"gestion ",this.gestion)
      if (data !== null && data !== undefined && data !== "") {
        console.log('data get',data)  
      }
    })
  }

  updateTiempo(){
  
    this.service.updateTiempo(this.creacion,this.gestion,this.carteraID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      // console.log(respuesta)
      if (respuesta.status === 1) {
        this.service.notificacion(respuesta.message)
      }else{
        this.service.notificacion(respuesta.message)
      }
    })
  }

  goBack() {
    this.route.navigate(['carteras/carteras_listas'])
    // window.history.back();
  }

  setDefaultToZero() {
    if (this.creacion === null || isNaN(this.creacion)) {
      this.creacion = 0;
    }

    if (this.gestion === null || isNaN(this.gestion)) {
      this.gestion = 0;
    }
  }

  FillTable<T>(Datos: T[], DataSource: MatTableDataSource<T>, sort: MatSort, paginator: MatPaginator) {
    DataSource.data = Datos;
    DataSource.sort = sort;
    DataSource.paginator = paginator;
  }
}
