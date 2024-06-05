import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExtensionesUsuariosService } from '../extensiones-usuarios.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-extensiones-usuarios-edit',
  templateUrl: './extensiones-usuarios-edit.component.html',
  styleUrls: ['./extensiones-usuarios-edit.component.css']
})
export class ExtensionesUsuariosEditComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<ExtensionesUsuariosEditComponent>,
    private service: ExtensionesUsuariosService,
    private auth: AuthService,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  extensionID = this.data[0].EXTENSIONID
  usuarioID = this.data[0].USUARIOID
  carteraID = this.data[1]
  ListaExtenciones: any[] = []
  ListaUsuarios: any[] = []

  ngOnInit(): void {

   this.genListaExtensiones()
   this.genListaUsuarios()
  }

  genListaExtensiones(){
    this.service.getListaExtensionesUpdate(this.carteraID,this.extensionID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaExtenciones = JSON.parse(data)
      console.log(this.ListaExtenciones)
    })
  }

  genListaUsuarios(){
    this.service.getListaUsuariosUpdate(this.carteraID,this.usuarioID).subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.ListaUsuarios = JSON.parse(data)
      console.log(this.ListaUsuarios)
    })
  }


  ModificarExtensionUsuario() {
    if (this.extensionID == 0 || this.usuarioID == 0) {
      this.service.notificacion("La extension y el usuario son obligatorios");
      return;
    }
    if (this.extensionID <= 0) {
      this.service.notificacion("La extension no puede ser negativa");
      return;
    }

    this.service.Update(this.extensionID, this.usuarioID).subscribe(r => {
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
    this.extensionID = 0;
    this.usuarioID = 0;
  }
  CloseDialog(): void {
    this.dialogRef.close()
  }
}
