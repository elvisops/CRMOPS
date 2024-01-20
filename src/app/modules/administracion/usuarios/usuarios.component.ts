import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Usuarios } from './usuarios';
import { UsuariosService } from './usuarios.service';
import { UsuariosCrearComponent } from './usuarios-crear/usuarios-crear.component';
/*Material Table*/
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
/*Material Dialog - ventana emergente */
import { MatDialog } from '@angular/material/dialog';
import { UsuariosEditarComponent } from './usuarios-editar/usuarios-editar.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  rolID: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: UsuariosService,
    private auth: AuthService,
    private dialog:MatDialog,
  ) { }

  ListaUsuarios: Usuarios[] = []
  DataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  Columnas: string[] = ["USUARIO","ESTADO","CREACION","ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.genListaUsuarios()

    this.rolID = sessionStorage.getItem('rolID')
    console.log(this.rolID)
  }

  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage();
    }
  }

  genListaUsuarios() {
    this.service.getListaUsuarios().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaUsuarios = JSON.parse(data)
      this.FillTable(this.ListaUsuarios)
    })
  }

  FillTable(Datos: Usuarios[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(UsuariosCrearComponent,{
      width:'40%',
      data:null,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaUsuarios()
    })
  }

  OpenDialogEditar(Usuario:any){
    const dialogRef = this.dialog.open(UsuariosEditarComponent,{
      width:'40%',
      height: '90%',
      data:Usuario,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{   
      this.genListaUsuarios()
    })
  }
  // liena de comentario

} 
