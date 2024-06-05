import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExtensionesService } from '../extensiones.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-extensiones-crear',
  templateUrl: './extensiones-crear.component.html',
  styleUrls: ['./extensiones-crear.component.css']
})
export class ExtensionesCrearComponent implements OnInit {

  extension: number = 0
  carteraID: number = 0
  usuarioID: number = 0
  descripcion: string = ""
  listaCarteras: any[] = []
  listaUsuarios: any[] = []

  constructor(
    private dialogRef: MatDialogRef<ExtensionesCrearComponent>,
    private service: ExtensionesService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.genListaCarteras()
    this.genListaUsuario()
  }

  genListaCarteras() {
    this.service.getListaCarteras().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      // this.ListaCarteras = JSON.parse(data)
      // this.FillTable(this.ListaCarteras)
      this.listaCarteras = JSON.parse(data)
      console.log(this.listaCarteras)
    })
  }

  genListaUsuario() {
    this.service.getListaUsuarios().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaUsuarios = JSON.parse(data)
      console.log(this.listaUsuarios)
    })
  }

  CrearExtension() {
    if (this.extension == 0 || this.carteraID == 0) {
      this.service.notificacion("La extension y la cartera son obligatorios");
      return;
    }
    if (this.extension <= 0) {
      this.service.notificacion("La extension no puede ser negativa");
      return;
    }

    this.service.Crear(this.extension, this.carteraID, this.descripcion).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)

      if (respuesta.status == 1) {
        this.resetForm()
        this.service.notificacion(respuesta.message)
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  resetForm() {
    this.extension = 0;
    this.carteraID = 0;
    this.descripcion = "";
  }

  CloseDialog(): void {
    this.dialogRef.close()
  }
}
