import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ModulosVistas } from '../modulos';
import { ModulosService } from '../modulos.service';
import { VistasCrearComponent } from './vistas-crear/vistas-crear.component';
import { VistasEditarComponent } from './vistas-editar/vistas-editar.component';

@Component({
  selector: 'app-vistas',
  templateUrl: './vistas.component.html',
  styleUrls: ['./vistas.component.css']
})
export class VistasComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private auth: AuthService,
    private service: ModulosService,
    private dialog: MatDialog
  ) { }

  ModuloId: number = 0
  ModuloName: string = ""
  ListaVistas: ModulosVistas[] = []
  DataSource: MatTableDataSource<ModulosVistas> = new MatTableDataSource()
  Columnas: string[] = ['VISTA', 'V_URL', 'CREACION', 'ACTUALIZACION', 'OPCIONES']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  ngOnInit(): void {
    var RouteID = this.router.snapshot.params['id']
    RouteID = this.auth.mkurl_dec(RouteID.toString())
    this.ModuloId = RouteID
    this.ObtenerListaVistas();
  }

  ObtenerListaVistas() {
    this.service.getModulosVistas(this.ModuloId).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.ListaVistas = respuesta
      this.FillTable(respuesta)
    })
    setTimeout(() => {
      this.getName()
    }, 100);
  }

  getName() {
    this.service.getNameModuloVista(this.ModuloId).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.ModuloName = respuesta.data
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  CrearVista(ModuloId: number) {
    const dialogRef = this.dialog.open(VistasCrearComponent,{
      width: '50%',
      data: ModuloId,
      disableClose:true
    })
    
    dialogRef.afterClosed().subscribe(datos => {
      this.ObtenerListaVistas()
    })
  }

  ActualizarVista(Vista:any){
    const dialogRef = this.dialog.open(VistasEditarComponent,{
      width: '50%',
      data:Vista,
      disableClose:true
    })
  }

  FillTable(data: ModulosVistas[]) {
    this.DataSource = new MatTableDataSource(data)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  Filtrar(evt:Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value;
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (this.DataSource.paginator) {
      this.DataSource.paginator.firstPage()
    }
  }
}
