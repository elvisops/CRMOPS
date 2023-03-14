import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { SociosProyectos } from '../socios';
import { SociosService } from '../socios.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog';
import { ProyectoCrearComponent } from './proyecto-crear/proyecto-crear.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{


  constructor(
    private router: ActivatedRoute,
    private auth:AuthService,
    private service: SociosService,
    private dialog:MatDialog
  ){}

  
  SocioID:number = 0
  ListaProyectos:SociosProyectos[] = []
  DataSource:MatTableDataSource<SociosProyectos> = new MatTableDataSource()
  Columnas:string[] = ['PROYECTO','CREACION','ACTUALIZACION','OPCIONES']
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort



  ngOnInit(): void {
    var RouteID = this.router.snapshot.params['id'];
    RouteID = this.auth.desencriptar(RouteID.toString())
    this.SocioID = RouteID
    this.ObtenerListaProyectos()
  }

  ObtenerListaProyectos(){
    this.service.getSociosProyectos(this.SocioID).subscribe(r=>{      
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.ListaProyectos = respuesta
      this.FillTable(respuesta)
    })
  }

  FillTable(data:SociosProyectos[]){
    this.DataSource = new MatTableDataSource(data)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  CrearProyecto(){
    const dialogRef = this.dialog.open(ProyectoCrearComponent,{
      width:'50%',
      data:null,
      disableClose:true
    })

    dialogRef.afterClosed().subscribe(datos=>{
      
    })
  }
  
  ActualizarProyecto(proyecto:any){
    
  }



  
}
