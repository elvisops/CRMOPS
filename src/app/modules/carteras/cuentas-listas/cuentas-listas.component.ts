import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarterasService } from '../carteras.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { CuentasListas } from './cuentas-listas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CuentaEditComponent } from '../cuenta-edit/cuenta-edit.component';

@Component({
  selector: 'app-cuentas-listas',
  templateUrl: './cuentas-listas.component.html',
  styleUrls: ['./cuentas-listas.component.css']
})
export class CuentasListasComponent implements OnInit {
  carteraID!: number;
  cartera!: string;
  id!: number
  condicion!: string
  TipoCarteraID!: number
  searchIdentidad: string = ""

  filtroID: number = 0
  ListaFiltros: any[] = [
    { ID: '1', FILTRO: 'Toda la Asignacion' },
    { ID: '2', FILTRO: 'Mi Asignacion' },
    { ID: '3', FILTRO: 'Cola de trabajo' },
    { ID: '4', FILTRO: 'Identidad' },
    { ID: '5', FILTRO: 'Numero Orden' },
  ]

  tablaCuentas: boolean = false
  divSearch: boolean = false
  botonFiltrar: boolean = false
  inputNumeroOrden: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: ActivatedRoute,
    private service: CarterasService,
    private auth: AuthService,
    private route: Router,
    private dialog: MatDialog,
  ) { }

  ListaCuentas: CuentasListas[] = []
  DataSource: MatTableDataSource<CuentasListas> = new MatTableDataSource();
  // Columnas: string[] = ["CUENTAID","CUENTA","ESTADO","CARTERAID","PERSONAID","CREACION","ACTUALIZACION","CARTERA","NOMBRE"]
  Columnas: string[] = ["OPCIONES", "CUENTA", "NOMBRE", "IDENTIFICACION", "TIPIFICACION", "SUBTIPIFICACION", "ACCION", "RESULTADO", "USUARIO", "ESTADO", "CREACION"]

  ngOnInit(): void {
    this.getVariables()
    //  this.genListaCuentas()
    // alert(this.cartera)
  }

  getVariables() {
    this.router.queryParams.subscribe(params => {
      this.carteraID = +params['carteraID'];
      // this.cartera = params['cartera'];
      this.TipoCarteraID = +params['TipoCarteraID']
    })
  }

  genData() {
    // alert(this.filtroID)
    var token = sessionStorage.getItem('token');
    token = this.auth.desencriptar(token);
    if (this.filtroID == 1) {
      this.id = 1
      // this.condicion = `WHERE CC.CARTERAID = ${this.carteraID};`
      this.condicion = ` CC.CARTERAID = ${this.carteraID} AND CC.PERSONAID <> `

    } else if (this.filtroID == 2) {
      this.id = 2
      // this.condicion = `WHERE CC.CARTERAID = ${this.carteraID} AND U.TOKEN = ''${token}''`
      this.condicion = ` CC.CARTERAID = ${this.carteraID} AND U.TOKEN = ''${token}''`

    } else if (this.filtroID == 3) {
      this.id = 3
      // this.condicion = `WHERE CC.CARTERAID = ${this.carteraID} AND U.TOKEN = ''${token}''`
      this.condicion = `WHERE CC.CARTERAID = ${this.carteraID} AND U.TOKEN = ''${token}''`
    }
    this.genListaCuentas()
  }

  BuscarPorIdentidad() {
    // this.divSearch = true
    // this.inputNumeroOrden = true

    // this.searchIdentidad = this.searchIdentidad.replace(/[-\s]/g, '');
    this.searchIdentidad = this.searchIdentidad.replace(/[ -]/g, '');
    if (this.divSearch) {
      // this.searchIdentidad = this.searchIdentidad.replace(/[-\s]/g, '');
      this.service.searchIdentidad(this.carteraID, this.searchIdentidad).subscribe(r => {
        var data = this.auth.desencriptar(r.data)
        this.ListaCuentas = JSON.parse(data)
        console.log(data)
        this.FillTable(this.ListaCuentas)
        this.tablaCuentas = true
      })
    }else if(this.inputNumeroOrden){
      // console.log("Buscar por numero orden")
      this.service.searchNumeroOrden(this.carteraID, this.searchIdentidad).subscribe(r => {
        var data = this.auth.desencriptar(r.data)
        this.ListaCuentas = JSON.parse(data)
        console.log(data)
        this.FillTable(this.ListaCuentas)
        this.tablaCuentas = true
      })
    }


  }

  genListaCuentas() {
    // alert(this.id+" "+this.condicion)
    // return
    this.service.getListaCuentas(this.id, this.condicion, this.carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaCuentas = JSON.parse(data)
      console.log(this.ListaCuentas)
      this.FillTable(this.ListaCuentas)
      this.tablaCuentas = true
    })
  }

  GestionCuenta(cuentaID: number, carteraID: number) {
    // alert(cuentaID)
    // this.TipoCarteraID
    if (this.TipoCarteraID == 1) {
      console.log("ventas")
    } else if (this.TipoCarteraID == 2) {
      console.log("Cobros")
      this.route.navigate(['carteras/carteras_cuentas'], { queryParams: { cuentaID: cuentaID } })
    } else {
      console.log("Atencio al cliente")
      this.route.navigate(['carteras/atencion_cliente'], { queryParams: { cuentaID: cuentaID, carteraID: carteraID } })

    }
    // this.route.navigate(['carteras/carteras_cuentas'],{ queryParams: {cuentaID:cuentaID}})
  }

  OpenDialogEditar(cliente: any) {
    const dialogRef = this.dialog.open(CuentaEditComponent, {
      width: '80%',
      data: cliente,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(datos => {
      this.genData()
    })
  }

  onChangeFiltro() {
    if (this.filtroID >= 1 && this.filtroID <= 3) {
      this.botonFiltrar = true
    } else {
      this.botonFiltrar = false
    }

    if (this.filtroID == 4) {
      this.divSearch = true
    } else {
      this.divSearch = false
    }

    if (this.filtroID == 5) {
      this.inputNumeroOrden = true
    } else {
      this.inputNumeroOrden = false
    }
  }

  Filtrar(evt: Event) {
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    }
  }

  FillTable(Datos: CuentasListas[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }
}

