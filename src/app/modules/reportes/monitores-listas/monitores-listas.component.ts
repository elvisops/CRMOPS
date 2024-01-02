import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ReportesListasService } from '../reportes-listas/reportes-listas.service';
import { CarterasListas } from '../reportes-listas/reportes-listas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MonitoresListasService } from './monitores-listas.service';
import { MonitoresListas } from './monitores-listas';
import { VentanaMonitorComponent } from './ventana-monitor/ventana-monitor.component';


@Component({
  selector: 'app-monitores-listas',
  templateUrl: './monitores-listas.component.html',
  styleUrls: ['./monitores-listas.component.css']
})
export class MonitoresListasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: MonitoresListasService,
    private auth: AuthService,
    private dialog: MatDialog,
  ) { }

  ListaCarteras: CarterasListas[] = []
  ListaMonitores: MonitoresListas[] = []

  DataSource: MatTableDataSource<CarterasListas> = new MatTableDataSource()
  DataSourceMonitores: MatTableDataSource<MonitoresListas> = new MatTableDataSource
  Columnas: string[] = ["PROYECTO", "CARTERA", "TIPOCARTERA", "OPCIONES"]
  ColumnasMonitores: string[] = ["MONITOR", "CREACION", "OPCIONES"]
  tablaMonitores: boolean = false
  monitorID: number = 0
  datos: any = []
  nuevaVentana: string | any = ""

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

  genListaMonitores(carteraID: number) {
    this.service.getListaReportes(carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      // console.log(JSON.parse(data))
      this.ListaMonitores = JSON.parse(data)
      this.FillTable<MonitoresListas>(this.ListaMonitores, this.DataSourceMonitores, this.sort, this.paginator)
      this.tablaMonitores = true
    })
  }

  abrirMonitor(element: any) {
    if (element.FILTRO_FECHA == 1 || element.FILTRO_HORA == 1) {
      //MODAL DE CONFIRMACION 
    } else {
      this.monitorID = element.MONITORID
      // this.genDatos(element.MONITORID)
      this.abrirPopup(element.GRAFICO)
    }
  }


  abrirPopup(grafico:number){
    const opciones = 'width=1000,height=400,top=100,left=100';
    const nuevaVentana = window.open(`reportes/ventana_monitor?monitorID=${this.monitorID}&grafico=${grafico}`,'_blank', opciones)
  }

  genDatos(MONITORID: any, fechaInicio: any = "", fechaFin: any = "") {
    this.service.getDatos(MONITORID, fechaInicio, fechaFin).subscribe(r => {
      var data = this.auth.desencriptar(r.data);
      this.datos = JSON.parse(data);
      // console.log(this.datos);

      // Actualiza la tabla en la ventana emergente con los datos obtenidos
      const tablaBody = this.nuevaVentana.document.getElementById('tabla-body');
      if (tablaBody) {
        tablaBody.innerHTML = '';

        this.datos.forEach((item: any) => {
          const fila = this.nuevaVentana.document.createElement('tr');
          for (const prop in item) {
            const celda = this.nuevaVentana.document.createElement('td');
            celda.textContent = item[prop];
            fila.appendChild(celda);
          }
          if (tablaBody) {
            tablaBody.appendChild(fila);
          }
        });
      }
    });
  }

  FillTable<T>(Datos: T[], DataSource: MatTableDataSource<T>, sort: MatSort, paginator: MatPaginator) {
    DataSource.data = Datos;
    DataSource.sort = sort;
    DataSource.paginator = paginator;
  }
}
