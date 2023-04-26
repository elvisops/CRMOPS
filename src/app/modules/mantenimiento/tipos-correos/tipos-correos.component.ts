import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Tcorreos } from './tipos-correos';
import { TiposCorreosService } from './tipos-correos.service';
/*Material Table*/
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
/*Material Dialog - ventana emergente */
import { MatDialog } from '@angular/material/dialog';
import { TiposCorreosCrearComponent } from './tipos-correos-crear/tipos-correos-crear.component';
import { TiposCorreosEditarComponent } from './tipos-correos-editar/tipos-correos-editar.component';


@Component({
  selector: 'app-tipos-correos',
  templateUrl: './tipos-correos.component.html',
  styleUrls: ['./tipos-correos.component.css']
})
export class TiposCorreosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: TiposCorreosService,
    private auth: AuthService,
    private dialog:MatDialog
  ){}

  ListaTcorreos: Tcorreos[] = []
  DataSource: MatTableDataSource<Tcorreos> = new MatTableDataSource();
  Columnas: string[] = ["TIPO_CORREO","CREACION","ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.genListaTcorreos();
  }
  
  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage();
    }
  }

  genListaTcorreos() {
    this.service.getListaTcorreos().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaTcorreos = JSON.parse(data)
      this.FillTable(this.ListaTcorreos)
    })
  }

  FillTable(Datos: Tcorreos[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(TiposCorreosCrearComponent,{
      width:'40%',
      data:null,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaTcorreos()
    })
  }

  OpenDialogEditar(element:any){
    const dialogRef = this.dialog.open(TiposCorreosEditarComponent,{
      width:'40%',
      data:element,
      disableClose:true
    });

    

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaTcorreos()
    })
  }


}
