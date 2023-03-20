import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment';
import { TiposDireccionesService } from './tipos-direcciones.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposDirecciones } from './tipos-direcciones';
import { MatTableDataSource } from '@angular/material/table';
import { TiposDireccionesCrearComponent } from './tipos-direcciones-crear/tipos-direcciones-crear.component';
import { TiposDireccionesEditarComponent } from './tipos-direcciones-editar/tipos-direcciones-editar.component';

@Component({
  selector: 'app-tipos-direcciones',
  templateUrl: './tipos-direcciones.component.html',
  styleUrls: ['./tipos-direcciones.component.css']
})
export class TiposDireccionesComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: TiposDireccionesService,
    private auth: AuthService,
    private dialog:MatDialog,
  ) { }

  ListaTiposDirecciones: TiposDirecciones[] =[]

  DataSource: MatTableDataSource<TiposDirecciones> = new MatTableDataSource();
  Columnas: string[] = ["TIPODIRECCION","CREACION","ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.genListaTiposDirecciones()
  }

  Filtrar(evt:Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage()
    }
  }
  genListaTiposDirecciones(){
    this.service.ObtenerListaTiposDirecciones().subscribe( r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaTiposDirecciones = JSON.parse(data)
      this.FillTable(this.ListaTiposDirecciones)
    })
  }

  FillTable(Datos: TiposDirecciones[]){
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(TiposDireccionesCrearComponent, {
      width: '40%',
      data:null,
      disableClose: true
    })
  }

  OpenDialogEditar(element:any){
    const dialogRef = this.dialog.open(TiposDireccionesEditarComponent,{
      width: '40%',
      data:element,
      disableClose:true
    })
    dialogRef.afterClosed().subscribe(datos => {
      this.genListaTiposDirecciones()
    })
  }

}
