import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { SociosProyectos } from '../socios';
import { SociosService } from '../socios.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog';
import { ProyectoCrearComponent } from './proyecto-crear/proyecto-crear.component';
import { ProyectoEditarComponent } from './proyecto-editar/proyecto-editar.component';

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
    private dialog:MatDialog,
    private navigate:Router,    
  ){}

  
  SocioID:number = 0
  SocioName:string = ""
  ListaProyectos:SociosProyectos[] = []
  DataSource:MatTableDataSource<SociosProyectos> = new MatTableDataSource()
  Columnas:string[] = ['PROYECTO','CREACION','ACTUALIZACION','OPCIONES']
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort



  ngOnInit(): void {
    var RouteID = this.router.snapshot.params['id'];
    RouteID = this.auth.mkurl_dec(RouteID.toString())
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

    setTimeout(()=>{
      this.getName()
    },100)
  }

  getName(){
    this.service.getNameSocio(this.SocioID).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.SocioName = respuesta.data
      }else{
        this.service.notificacion(respuesta.message)
      }
    })
  }

  FillTable(data:SociosProyectos[]){
    this.DataSource = new MatTableDataSource(data)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  GotoCarteras(proyecto:any){
    var id = this.auth.mkurl_enc(proyecto.toString()).toString()    
    this.navigate.navigate(['administracion/socios/carteras/'+id])
  }

  CrearProyecto(SocioID:number){
    const dialogRef = this.dialog.open(ProyectoCrearComponent,{
      width:'50%',
      data:SocioID,
      disableClose:true
    })

    dialogRef.afterClosed().subscribe(datos=>{
      this.ObtenerListaProyectos()
    })
  }
  
  ActualizarProyecto(proyecto:any){
    const dialogRef = this.dialog.open(ProyectoEditarComponent,{
      width:'50%',
      data:proyecto,
      disableClose:true
    })

    dialogRef.afterClosed().subscribe(datos=>{
      this.ObtenerListaProyectos()
    })
  }



  
}
