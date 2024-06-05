import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Extensiones } from './extensiones';
import { MatPaginator } from '@angular/material/paginator';
import { ExtensionesService } from './extensiones.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosCrearComponent } from '../usuarios/usuarios-crear/usuarios-crear.component';
import { MatSort } from '@angular/material/sort';
import { ExtensionesCrearComponent } from './extensiones-crear/extensiones-crear.component';
import { ExtensionesEditComponent } from './extensiones-edit/extensiones-edit.component';

@Component({
  selector: 'app-extensiones',
  templateUrl: './extensiones.component.html',
  styleUrls: ['./extensiones.component.css']
})
export class ExtensionesComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ExtensionesService,
    private auth: AuthService,
    private dialog: MatDialog
  ){}

  DataSource: MatTableDataSource<Extensiones> = new MatTableDataSource();
  ListaExtenciones: Extensiones[] = []
  Columnas: string[] = ["EXTENSION","CARTERA","DESCRIPCION","CREACION","ACTUALIZACION","OPCIONES"]
  ngOnInit(): void {
    this.genListaExtensiones();
  }

  genListaExtensiones(){
    this.service.getListaExtensiones().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaExtenciones = JSON.parse(data)
      console.log("extensiones: ",this.ListaExtenciones)
      this.FillTable(this.ListaExtenciones)
    })
  }


  
  extensionEditar(Extension:any){
    const dialogRef = this.dialog.open(ExtensionesEditComponent, {
      width: '50%',
      data: Extension,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(datos => {
      this.genListaExtensiones()
    })
  }


  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    }
  }

  FillTable(Datos: Extensiones[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }
  OpenDialogCrear(){
    const dialogRef = this.dialog.open(ExtensionesCrearComponent,{
      width: '50%',
      data: null,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(datos => {
      this.genListaExtensiones()
    })
  }
}
