import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { TiposProductos } from './tipos-productos';
import { TiposProductosService } from './tipos-productos.service';
/*Material Table*/
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
/*Material Dialog - ventana emergente */
import { MatDialog } from '@angular/material/dialog';
import { TiposProductosCrearComponent } from './tipos-productos-crear/tipos-productos-crear.component';
import { TiposProductosEditarComponent } from './tipos-productos-editar/tipos-productos-editar.component';

@Component({
  selector: 'app-tipos-productos',
  templateUrl: './tipos-productos.component.html',
  styleUrls: ['./tipos-productos.component.css']
})
export class TiposProductosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: TiposProductosService,
    private auth: AuthService,
    private dialog:MatDialog
  ){}

  ListaProductos: TiposProductos[] = []
  DataSource: MatTableDataSource<TiposProductos> = new MatTableDataSource();
  Columnas: string[] = ["TIPO_PRODUCTO","DESCRIPCION","CREACION","ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.genListaProductos()
  }

  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage()
    }
  }

  genListaProductos() {
    this.service.getListaTproductos().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaProductos = JSON.parse(data)
      this.FillTable(this.ListaProductos)
    })
  }


  FillTable(Datos: TiposProductos[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(TiposProductosCrearComponent,{
      width:'40%',
      data:null,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaProductos()
    })
  }

  OpenDialogEditar(element:any){
    const dialogRef = this.dialog.open(TiposProductosEditarComponent,{
      width:'40%',
      data:element,
      disableClose:true
    });

    

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaProductos()
    })
  }
  


}
