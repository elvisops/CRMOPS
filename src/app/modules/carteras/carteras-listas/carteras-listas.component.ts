import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarterasListas } from './carteras-listas';
// import { CarterasService } from '../../administracion/socios/proyectos/carteras/carteras.service';
import { CarterasService } from '../carteras.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-carteras-listas',
  templateUrl: './carteras-listas.component.html',
  styleUrls: ['./carteras-listas.component.css']
})
export class CarterasListasComponent implements OnInit{
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: CarterasService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    public datePipe: DatePipe,
  ){}

  ListaCarteras: CarterasListas[] = []
  DataSource:MatTableDataSource<CarterasListas> = new MatTableDataSource();
  // Columnas: string[] = ["CARTERAID","CARTERA","TIPOCARTERAID","TIPOCARTERA","PROYECTOID","PROYECTO"]
  Columnas: string[] = ["CARTERA","TIPOCARTERA","PROYECTO","CREACION","ACTUALIZACION","OPCIONES"]
  ngOnInit(): void {
    new Date().toLocaleString("en-US")
    this.genListaCarteras()
  }

  genListaCarteras(){
    this.service.getListaCarteras().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaCarteras = JSON.parse(data)
      this.FillTable(this.ListaCarteras)
      console.log("LISTACARTERAS",this.ListaCarteras);
    })
  }

  ShowCuentas(CarteraID: number,Cartera: string){
    // alert(Cartera)
    // console.log(CarteraID)
    this.router.navigate(['carteras/cuentas_listas'],{ queryParams: {carteraID: CarteraID, cartera:Cartera}})
  }
  
  FillTable(Datos: CarterasListas[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

}