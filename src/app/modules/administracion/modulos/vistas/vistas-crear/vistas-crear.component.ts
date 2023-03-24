import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { VistasService } from '../vistas.service';

@Component({
  selector: 'app-vistas-crear',
  templateUrl: './vistas-crear.component.html',
  styleUrls: ['./vistas-crear.component.css']
})
export class VistasCrearComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<VistasCrearComponent>,
    private service: VistasService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  Vista: string = ""
  VistaUrl: string = ""

  ngOnInit(): void {

  }

  CrearVista() {
    if (this.Vista == "") {
      this.service.notificacion("Debe agregar el nombre de la vista")
      return
    }
    this.service.CrearVista(this.data, this.Vista, this.VistaUrl).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.service.notificacion("La vista se registro exitosamente!")
        this.CloseDialog()
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  CloseDialog() {
    this.dialogRef.close()
  }
}
