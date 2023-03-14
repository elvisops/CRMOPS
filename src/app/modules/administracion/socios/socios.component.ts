import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Socios } from './socios';
import { SociosService } from './socios.service';
/*Material Table*/
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
/*Material Dialog - ventana emergente */
import { MatDialog } from '@angular/material/dialog';
import { SociosCrearComponent } from './socios-crear/socios-crear.component';
import { SociosEditarComponent } from './socios-editar/socios-editar.component';
import { ContactosComponent } from './contactos/contactos.component';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: SociosService,
    private auth: AuthService,
    private dialog:MatDialog
  ){}

  ListaSocios: Socios[] = []
  DataSource: MatTableDataSource<Socios> = new MatTableDataSource();
  Columnas: string[] = ["SOCIO","DESCRIPCION","CREACION","ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.genListaSocios()
  }
  

  genListaSocios() {
    this.service.getListaSocios().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaSocios = JSON.parse(data)
      this.FillTable(this.ListaSocios)
    })
  }

  FillTable(Datos: Socios[]) {
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.sort = this.sort
    this.DataSource.paginator = this.paginator
  }

  OpenDialogCrear(){
    const dialogRef = this.dialog.open(SociosCrearComponent,{
      width:'40%',
      data:null,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{     
      
      this.genListaSocios()
    })
  }

  OpenDialogEditar(element:any){
    const dialogRef = this.dialog.open(SociosEditarComponent,{
      width:'40%',
      data:element,
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(datos=>{           
      this.genListaSocios()
    })
  }

  OpenDialogSociosContacts(SocioID:any){
    const dialogRef = this.dialog.open(ContactosComponent,{
      width:'80%',
      data:SocioID,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{
      
    })

  }

}
