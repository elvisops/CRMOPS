import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { TiposDireccionesService } from '../tipos-direcciones.service';

@Component({
  selector: 'app-tipos-direcciones-crear',
  templateUrl: './tipos-direcciones-crear.component.html',
  styleUrls: ['./tipos-direcciones-crear.component.css']
})
export class TiposDireccionesCrearComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TiposDireccionesCrearComponent>,
    private service: TiposDireccionesService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // VARIABLES
  tipo: string = ""
  ListaTiposDirecciones: any[] = []


  ngOnInit(): void {

  }

  CrearTipoDireccion() {
    if (this.tipo == "") {
      this.service.notificacion("Debe llenar el tipo de direccion")
      return
    }
    this.service.Crear(this.tipo).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.data = respuesta.data
        this.ResetForm()
        this.service.notificacion(respuesta.message)
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  ResetForm() {
    this.tipo = ""
  }

  CloseDialog(): void {
    this.dialogRef.close()
  }
}
