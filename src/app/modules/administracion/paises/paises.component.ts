import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Paises } from './paises';
import { PaisesService } from './paises.service';
/*Material Table*/
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
/*Material Dialog - ventana emergente */
import { MatDialog } from '@angular/material/dialog';
import { PaisesCrearComponent } from './paises-crear/paises-crear.component';
import { PaisesEditarComponent } from './paises-editar/paises-editar.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: PaisesService,
    private auth: AuthService,
    private dialog:MatDialog
  ){}

  ListaPaises: Paises[] = []
  DataSource: MatTableDataSource<Paises> = new MatTableDataSource();
  Columnas: string[] = ["PAIS","CREACION","ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.genListaPaises();
  }
  
  Filtrar(evt: Event){
    const valorFiltrado = (evt.target as HTMLInputElement).value
    this.DataSource.filter = valorFiltrado.trim().toLocaleLowerCase()
    if(this.DataSource.paginator){
      this.DataSource.paginator.firstPage()
    }
  }
 
  genListaPaises() {
    this.service.getListaPaises().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaPaises = JSON.parse(data)
      this.FillTable(this.ListaPaises)
    })
  }

  FillTable(Datos: Paises[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(PaisesCrearComponent,{
      width:'40%',
      data:null,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaPaises()
    })
  }

  OpenDialogEditar(element:any){
    const dialogRef = this.dialog.open(PaisesEditarComponent,{
      width:'40%',
      data:element,
      disableClose:true
    });

    

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaPaises()
    })
  }



}
