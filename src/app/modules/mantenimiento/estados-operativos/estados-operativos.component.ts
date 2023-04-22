import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadosOperativosService } from './estados-operativos.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EstadosOperativos } from './estados-operativos';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EstadosOperativosCrearComponent } from './estados-operativos-crear/estados-operativos-crear.component';
import { EstadosOperativosEditarComponent } from './estados-operativos-editar/estados-operativos-editar.component';

@Component({
  selector: 'app-estados-operativos',
  templateUrl: './estados-operativos.component.html',
  styleUrls: ['./estados-operativos.component.css']
})
export class EstadosOperativosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: EstadosOperativosService,
    private auth: AuthService,
    private dialog: MatDialog
  ){}

  ListaEstadosOperativos: EstadosOperativos[] = []

  DataSource: MatTableDataSource<EstadosOperativos> = new MatTableDataSource()
  // Columnas: string[] = ["ESTADOOPERATIVO","DE_SISTEMA","ESTADO","CREACION","ACTUALIZACION","CARTERAID"]
  Columnas: string[] = ["ESTADOOPERATIVO","CARTERA","ESTADO","CREACION","ACTUALIZACION","OPCIONES"]


  ngOnInit(): void {
    this.genListaEstadosOperativos()
  }

  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage()
    }
  }

  genListaEstadosOperativos(){
    this.service.ObtenerListaEstadosOperativos().subscribe( r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaEstadosOperativos = JSON.parse(data)
      this.FillTable(this.ListaEstadosOperativos)
    })
  }

  FillTable(Datos: EstadosOperativos[]){
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this. paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(EstadosOperativosCrearComponent,{
      width: '40%',
      data: null,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(datos => {
      this.genListaEstadosOperativos()
    })
  }

  OpenDialogEditar(element:any){
    const dialogRef = this.dialog.open(EstadosOperativosEditarComponent,{
      width: '40%',
      data:element,
      disableClose:true
    })

    dialogRef.afterClosed().subscribe(datos => {
      this.genListaEstadosOperativos()
    })
  }

}
