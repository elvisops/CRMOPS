import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog';
import { CarterasService } from './carteras.service';
import { Carteras } from './carteras';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-carteras',
  templateUrl: './carteras.component.html',
  styleUrls: ['./carteras.component.css']
})
export class CarterasComponent implements OnInit{

  

  constructor(
    private auth:AuthService,
    private router:Router,
    private ActivatedRoute:ActivatedRoute,
    private dialog:MatDialog,
    private service:CarterasService,
    private location:Location
  ){}

  Proyecto:any
  ListaCarteras:Carteras[] = []
  DataSource:MatTableDataSource<Carteras> = new MatTableDataSource()
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  Columnas:string[] = ['CARTERA','TIPOCARTERA','CREACION','ACTUALIZACION','OPCIONES']

  ngOnInit(): void {
    var RouteData = this.ActivatedRoute.snapshot.params['proyectoid']
    RouteData = this.auth.mkurl_dec(RouteData.toString());
    RouteData = JSON.parse(RouteData)    
    this.Proyecto = RouteData

    this.ObtenerListaCarteras()
  }

  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage()
    }
  }

  ObtenerListaCarteras(){
    this.service.getCarteras(this.Proyecto.PROYECTOID).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.ListaCarteras = respuesta
      this.FillTable(respuesta)
    })
  }

  FillTable(Data:Carteras[]){
    this.DataSource = new MatTableDataSource(Data);
    this.DataSource.paginator = this.paginator
    this.DataSource.sort = this.sort
  }

  GotoCrearCartera(){
    var id = this.auth.mkurl_enc(JSON.stringify(this.Proyecto.PROYECTOID)).toString()    
    this.router.navigate(['administracion/socios/crear-cartera/'+id])
  }

  back(){
    this.location.back()    
  }


}
