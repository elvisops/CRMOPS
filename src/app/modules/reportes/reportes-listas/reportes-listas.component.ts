import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ReportesListasService } from './reportes-listas.service';
import { CarterasListas, ReportesListas } from './reportes-listas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FiltroDialogComponent } from './filtro-dialog/filtro-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reportes-listas',
  templateUrl: './reportes-listas.component.html',
  styleUrls: ['./reportes-listas.component.css']
})
export class ReportesListasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: ReportesListasService,
    private auth: AuthService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  ListaCarteras: CarterasListas[] = []
  ListaReportes: ReportesListas[] = []
  DataSource: MatTableDataSource<CarterasListas> = new MatTableDataSource()
  DataSourceReportes: MatTableDataSource<ReportesListas> = new MatTableDataSource()
  Columnas: string[] = ["PROYECTO", "CARTERA", "TIPOCARTERA", "OPCIONES"]
  ColumnasReportes: string[] = ["REPORTE", "CREACION", "OPCIONES"]
  tablaReportes: boolean = false

  datos: any = []
  nombreReporte: string = ""

  reporteID: number = 0

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
  genListaReportes(carteraID: number) {
    this.service.getListaReportes(carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaReportes = JSON.parse(data)
      // console.log(this.ListaReportes)
      this.FillTable<ReportesListas>(this.ListaReportes, this.DataSourceReportes, this.sort, this.paginator)

      this.tablaReportes = true
    })
  }

  descargarReporte(element: any) {
    // Nombre del reporte
    this.nombreReporte = element.REPORTE
    // console.log(element.REPORTEID)
    this.reporteID = element.REPORTEID
    if (element.FILTRO_FECHA == 1 || element.FILTRO_HORA == 1 || element.FILTRO_USUARIO == 1) {
      this.filtroConfirmacion(element.QUERY)
    } else {
      this.genDatos(element.QUERY)
    }
  }

  genDatos(query: any, fechaInicio: any = "", fechaFin: any = "") {
    if (this.reporteID >= 1005) {
      this.service.getDatosFecha(query, fechaInicio, fechaFin).subscribe(r => {
        var data = this.auth.desencriptar(r.data)
        this.datos = JSON.parse(data)
        // console.log(this.datos)
        this.genReporte()
      })
    }else{
      this.service.getDatos(query, fechaInicio, fechaFin).subscribe(r => {
        var data = this.auth.desencriptar(r.data)
        this.datos = JSON.parse(data)
        // console.log(this.datos)
        this.genReporte()
      })
    }
    
  }

  filtroConfirmacion(query: string) {
    const dialogRef = this.dialog.open(FiltroDialogComponent, {
      width: '400px',
      data: query
    });

    dialogRef.afterClosed().subscribe((result) => {
      // alert(query)
      if (result) {
        if (result.fechaInicio) {
          const fechaFormateada = this.datePipe.transform(result.fechaInicio, 'yyyy-MM-dd 01:00:00');
          const fechaFormateada2 = this.datePipe.transform(result.fechaFin, 'yyyy-MM-dd 24:59:00');
          // alert(fechaFormateada);
          // if (fechaFormateada !== null && fechaFormateada2 !== null) {
          //   query = query.replace("VARIABLE_FECHA_INICIO", fechaFormateada);
          //   query = query.replace("VARIABLE_FECHA_FIN", fechaFormateada2);
          //   // query = query.replace('VARIABLE_FECHA_INICIO', fechaInicio).replace('VARIABLE_FECHA_FIN', fechaFin);
          // } else {
          //   console.error('Error al formatear la fecha.');
          // }

          // console.log(query)
          // console.log("fechas ",fechaFormateada,fechaFormateada2)
          // return
          this.genDatos(query, fechaFormateada, fechaFormateada2)
        }

      }
    })
  }


  genReporte() {
    var alias = this.generarFechaString()
    this.service.generarReporte(this.datos, this.nombreReporte+'_'+alias)
  }

  FillTable<T>(Datos: T[], DataSource: MatTableDataSource<T>, sort: MatSort, paginator: MatPaginator) {
    DataSource.data = Datos;
    DataSource.sort = sort;
    DataSource.paginator = paginator;
  }

  generarFechaString(){
    const fechaHora = new Date();
    const dia = fechaHora.getDate().toString().padStart(2, '0');
    const mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses se indexan desde 0 (enero es 0)
    const año = fechaHora.getFullYear().toString();
    const hora = fechaHora.getHours().toString().padStart(2, '0');
    const minutos = fechaHora.getMinutes().toString().padStart(2, '0');
    const numeroUnico = dia + mes + año + hora + minutos;

    return numeroUnico
  }
}
