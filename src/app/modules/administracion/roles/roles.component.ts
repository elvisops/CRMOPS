import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Roles } from './roles';
import { RolesService } from './roles.service';
import { RolesCrearComponent } from './roles-crear/roles-crear.component';
/*Material Table*/
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; //el que nos permite ordenar las columnas de la tabla
import { MatTableDataSource } from '@angular/material/table';
/*Material Dialog - ventana emergente */
import { MatDialog } from '@angular/material/dialog';
import { RolesEditarComponent } from './roles-editar/roles-editar.component';




@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})


export class RolesComponent implements OnInit {
  //declaro el paginador y el ordenador de las tablas
  //view child es una implementacion de angular que sirve para crear la abstracion de un elemento
  @ViewChild(MatPaginator) paginator!: MatPaginator; //! = opcional 
  @ViewChild(MatSort) sort!: MatSort;
  //necesito una funcion constructor para importar el servicio de roles
  constructor(
    //variable de uso interno, con esta variable podre utilizar todos los metodos del roles.service.ts
    private service: RolesService,
    //necesito el servicio de auth para desemcriptar la respuesta que viene del servidor
    private auth: AuthService,
    private dialog:MatDialog
  ) { }
  // creo la variable que sera la abstaccion de Roles, como es una lista lo declaro como arreglo y vacio
  ListaRoles: Roles[] = [];
  DataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  //Defino las columnas a mostrar
  Columnas: string[] = ["ROL", "ESTADO", "DESCRIPCION", "CREACION", "ACTUALIZACION", "OPCIONES"]

  //la funcion oninit, llama a la funcion para llenar el arreglo ListaRoles
  ngOnInit(): void {
    this.genListaRoles()
  }

  filtrar(evt:Event){
    const valorFiltrado =(evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage();
    }
  }

  //no puede tener el mismo nombre del roles.service.ts
  genListaRoles() {
    this.service.getListaRoles().subscribe(r => {
      //retorna un select encriptado
      var data = this.auth.desencriptar(r.data)
      this.ListaRoles = JSON.parse(data)
      this.FillTable(this.ListaRoles);
      // console.log(JSON.parse(data));
    })
  }



  //funcion con parametro de un objeto de tipo Roles 
  FillTable(Datos: Roles[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(RolesCrearComponent,{
      width:'40%',
      data:null,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{   
      this.genListaRoles()
    })
  }

  OpenDialogEditar(element:any){
    const dialogRef = this.dialog.open(RolesEditarComponent,{
      width:'40%',
      data:element,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{   
      this.genListaRoles()
    })
  }

 

}
