import { Component, Inject, OnInit } from '@angular/core';
import { ExtensionesUsuariosService } from '../extensiones-usuarios.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-extensiones-usuarios-crear',
  templateUrl: './extensiones-usuarios-crear.component.html',
  styleUrls: ['./extensiones-usuarios-crear.component.css']
})
export class ExtensionesUsuariosCrearComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<ExtensionesUsuariosCrearComponent>,
    private service: ExtensionesUsuariosService,
    private auth: AuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any//trae el id de la cartera
  ){
    this.filteredExtensiones = this.ListaExtenciones.slice()
  }

  ListaExtenciones: any[] = []
  ListaUsuarios: any[] = []
  extensionID: number = 0
  usuarioID: number = 0

  searchTerm!: string;  
  searchTerm2!: string; 
  filteredMunicipios: any[] = [];
  myControl = new FormControl('');
  filteredOptions!: any[];
  filteredExtensiones: any[] = [];



  ngOnInit(): void {
    this.genListaExtensiones();
    this.genListaUsuarios();
  }

  genListaExtensiones(){
    this.service.getListaExtensiones(this.data).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaExtenciones = JSON.parse(data)
    })
  }

  genListaUsuarios(){
    this.service.getListaUsuarios(this.data).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaUsuarios = JSON.parse(data)
    })
  }


  CrearExtensionUsuario() {
    if (this.extensionID == 0 || this.usuarioID == 0) {
      this.service.notificacionError("La extension y el usuario son obligatorios");
      return;
    }
    if (this.extensionID <= 0) {
      this.service.notificacionError("La extension no puede ser negativa");
      return;
    }

    this.service.Crear(this.extensionID, this.usuarioID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.genListaExtensiones()
        this.genListaUsuarios()
        this.resetForm()
        this.service.notificacion(respuesta.message)
      } else {
        this.service.notificacionError(respuesta.message)
      }
    })
  }


  resetForm() {
    this.extensionID = 0;
    this.usuarioID = 0;
    this.searchTerm = '';
    this.searchTerm2 = '';
  }
  CloseDialog(): void {
    this.dialogRef.close()
  }

  // filter() {
  //   const filterValue = this.myControl.value!.toLowerCase();
  //   this.filteredOptions = this.ListaExtenciones.filter(option =>
  //     option.EXTENSION.toLowerCase().includes(filterValue)
  //   );
  // }

  // onSearchChange() {
  //   this.filteredMunicipios = this.ListaExtenciones.filter((extension) =>
  //     extension.EXTENSION.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  applyFilterText(data: any[], searchTerm2: string, property: string): any[] {
    if (searchTerm2) {
      return data.filter((item) =>
        item[property].toString().toLowerCase().includes(searchTerm2.toLowerCase())
      );
    } else {
      return data;
    }
  }

  applyFilter(data: any[], searchTerm: string, property: string): any[] {
    if (searchTerm) {
      return data.filter((item) => {
        return item[property].toString().includes(searchTerm);
      });
    } else {
      return data;
    }
  }
}
