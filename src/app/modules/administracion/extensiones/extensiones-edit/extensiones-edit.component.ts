import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ExtensionesService } from '../extensiones.service';

@Component({
  selector: 'app-extensiones-edit',
  templateUrl: './extensiones-edit.component.html',
  styleUrls: ['./extensiones-edit.component.css']
})
export class ExtensionesEditComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<ExtensionesEditComponent>,
    private service: ExtensionesService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  extensionID = this.data.EXTENSIONID
  extension = this.data.EXTENSION
  descripcion = this.data.DESCRIPCION
  carteraID = this.data.CARTERAID
  listaCarteras: any[] = []



  ngOnInit(): void {
    // console.log(this.extension)

    // this.obtenerVariables()
    this.genListaCarteras()
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

  updateExtension() {
    if (this.extension == 0 || this.carteraID == 0) {
      this.service.notificacion("La extension y la cartera son obligatorios");
      return;
    }
    if (this.extension <= 0) {
      this.service.notificacion("La extension no puede ser negativa");
      return;
    }

    this.service.update(this.extensionID,this.extension, this.carteraID, this.descripcion).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)

      if (respuesta.status == 1) {
        // this.resetForm()
        this.service.notificacion(respuesta.message)
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  CloseDialog(): void {
    this.dialogRef.close()
  }

}
