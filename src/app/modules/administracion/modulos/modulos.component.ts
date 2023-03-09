import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Modulos } from './modulos';
import { ModulosService } from './modulos.service';
/*Material Table*/
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
/*Material Dialog - ventana emergente */
import { MatDialog } from '@angular/material/dialog';
import { ModulosCrearComponent } from './modulos-crear/modulos-crear.component';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})



export class ModulosComponent implements OnInit{

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ModulosService,
    private auth: AuthService,
    private dialog:MatDialog
  ){}

  ListaModulos: Modulos[] = []
  DataSource: MatTableDataSource<Modulos> = new MatTableDataSource();
  Columnas: string[] = ["MODULO","DESCRIPCION","CREACION","ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.genListaModulos()
  }

  genListaModulos() {
    this.service.getListaModulos().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaModulos = JSON.parse(data)
      this.FillTable(this.ListaModulos)
    })
  }


  FillTable(Datos: Modulos[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(ModulosCrearComponent,{
      width:'40%',
      data:null,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaModulos()
    })
  }
  

}