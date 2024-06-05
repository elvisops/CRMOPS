import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExtensionesUsuarios } from './extensiones-usuarios';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ExtensionesUsuariosCrearComponent } from './extensiones-usuarios-crear/extensiones-usuarios-crear.component';
import { ExtensionesUsuariosService } from './extensiones-usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { ExtensionesUsuariosEditComponent } from './extensiones-usuarios-edit/extensiones-usuarios-edit.component';
import { ModalConfirmacionComponent } from '../../modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-extensiones-usuarios',
  templateUrl: './extensiones-usuarios.component.html',
  styleUrls: ['./extensiones-usuarios.component.css']
})
export class ExtensionesUsuariosComponent implements OnInit{


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private service: ExtensionesUsuariosService,
    private router: ActivatedRoute
  ){}


  carteraID: number = 0
  cartera: string = ''

  ListaUsuarioExtension: ExtensionesUsuarios[] =[]
  DataSource: MatTableDataSource<ExtensionesUsuarios> = new MatTableDataSource();
  Columnas: string[] = ["EXTENSION","USUARIO","CREACION","OPCIONES"]
  
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.carteraID = +params['carteraID']
      this.cartera = params['cartera']
    })
    this.genListaUsuarioExtension()
  }

  genListaUsuarioExtension(){
    this.service.getListaUsuarioExtension(this.carteraID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaUsuarioExtension = JSON.parse(data)
      this.FillTable(this.ListaUsuarioExtension)
    })
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(ExtensionesUsuariosCrearComponent,{
      width: '50%',
      data: this.carteraID,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(datos => {
      this.genListaUsuarioExtension()
    })
  }

  OpenDialogEdit(extension: any){
    const dialogRef = this.dialog.open(ExtensionesUsuariosEditComponent, {
      width: '50%',
      data: [extension,this.carteraID],
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(datos => {
      this.genListaUsuarioExtension()
    })
  }

  OpenDialogDelete(extensionID: any,usuarioID: any,usuario:any){
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '50%',
      data: `Desea remover la extension del usuario ${usuario}`,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.Delete(extensionID,usuarioID).subscribe(r => {
          var respuesta = this.auth.desencriptar(r.response)
          respuesta = JSON.parse(respuesta)
          respuesta = respuesta[0]

          if (respuesta.status == 1) {
            this.service.notificacion(respuesta.message)
            this.genListaUsuarioExtension()
          }else{
            this.service.notificacionError(respuesta.message)
          }
        })
      }
    })
  }

  Filtrar(evt: Event) {
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage();
    }
  }

  FillTable(Datos: ExtensionesUsuarios[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }
}
