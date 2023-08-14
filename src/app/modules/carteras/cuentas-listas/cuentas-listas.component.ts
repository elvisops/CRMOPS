import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarterasService } from '../carteras.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { CuentasListas } from './cuentas-listas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas-listas',
  templateUrl: './cuentas-listas.component.html',
  styleUrls: ['./cuentas-listas.component.css']
})
export class CuentasListasComponent implements OnInit{
  carteraID!: number;
  cartera!: string;
  id!: number
  condicion!: string

  filtroID: number = 0
  ListaFiltros: any[] = [
    {ID: '1', FILTRO: 'Toda la Asignacion'},
    {ID: '2', FILTRO: 'Mi Asignacion'},
    {ID: '3', FILTRO: 'Cola de trabajo'},
  ]

  tablaCuentas: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router :ActivatedRoute,
    private service: CarterasService,
    private auth: AuthService,  
    private route: Router,
  ) {}

  ListaCuentas: CuentasListas[] = []
  DataSource:MatTableDataSource<CuentasListas> = new MatTableDataSource();
  // Columnas: string[] = ["CUENTAID","CUENTA","ESTADO","CARTERAID","PERSONAID","CREACION","ACTUALIZACION","CARTERA","NOMBRE"]
  Columnas: string[] = ["OPCIONES","CUENTA","NOMBRE","IDENTIFICACION","TIPIFICACION","SUBTIPIFICACION","ACCION","RESULTADO","RAZON","USUARIO","ESTADO","SALDOLEMPIRAS","SALDODOLARES","CREACION"]

  ngOnInit(): void {
   this.getVariables()
  //  this.genListaCuentas()
    // alert(this.cartera)
  }

  getVariables(){
    this.router.queryParams.subscribe(params => {
      this.carteraID = +params['carteraID'];
      this.cartera = params['cartera'];
    })
  }

  genData(){
    // alert(this.filtroID)
     var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    if (this.filtroID == 1) {
      this.id = 1
      this.condicion = `WHERE CC.CARTERAID = ${this.carteraID};`
    }else if(this.filtroID == 2){
      this.id = 2
      // this.condicion = `WHERE CC.CARTERAID =${this.carteraID} AND CC.CUENTAID = 1185985`
      this.condicion = `WHERE CC.CARTERAID = ${this.carteraID} AND U.TOKEN = ''${token}''`
    }else if(this.filtroID == 3){
      this.id = 3
      this.condicion = `WHERE CC.CARTERAID = ${this.carteraID} AND U.TOKEN = ''${token}''`
    }
   this.genListaCuentas()
  }

  genListaCuentas(){
    // alert(this.id+" "+this.condicion)
    // return
    this.service.getListaCuentas(this.id,this.condicion,this.carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaCuentas = JSON.parse(data)
      console.log(this.ListaCuentas)
      this.FillTable(this.ListaCuentas)
      this.tablaCuentas = true
    })
  }

  GestionCuenta(cuentaID: number,cuenta:string, nombre:string){
    // alert(cuentaID)
    this.route.navigate(['carteras/carteras_cuentas'],{ queryParams: {cuentaID:cuentaID}})
  }

  FillTable(Datos: CuentasListas[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }
}

