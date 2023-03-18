import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { TiposTelefonos } from './tipos-telefonos';
import { TiposTelefonosCrearComponent } from './tipos-telefonos-crear/tipos-telefonos-crear.component';
import { TiposTelefonosEditarComponent } from './tipos-telefonos-editar/tipos-telefonos-editar.component';
import { TiposTelefonosService } from './tipos-telefonos.service';

@Component({
  selector: 'app-tipos-telefonos',
  templateUrl: './tipos-telefonos.component.html',
  styleUrls: ['./tipos-telefonos.component.css']
})
export class TiposTelefonosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: TiposTelefonosService,
    private auth:AuthService,
    private dialog:MatDialog
  ){}

  ListaTiposTelefonos: TiposTelefonos[] = []
  DataSource: MatTableDataSource<TiposTelefonos> = new MatTableDataSource();
  Columnas: string[] = ["TIPO","CREACION","ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.genListaTiposTelefonos()
  }

  filtrar(evt:Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage();
    }
  }

  genListaTiposTelefonos(){
    this.service.ObtenerListaTiposTelefonos().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaTiposTelefonos = JSON.parse(data)
      this.FillTable(this.ListaTiposTelefonos)
    })
  }

  FillTable(Datos: TiposTelefonos[]){
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(TiposTelefonosCrearComponent,{
      width: '40%',
      data:null,
      disableClose:true
    })
  }

  OpenDialogEditar(element:any){
    const dialogRef = this.dialog.open(TiposTelefonosEditarComponent,{
      width:'40%',
      data:element,
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(datos=>{
      this.genListaTiposTelefonos()
    })
  }
}
