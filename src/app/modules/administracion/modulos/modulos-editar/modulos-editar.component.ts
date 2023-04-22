import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ModulosService } from '../modulos.service';

@Component({
  selector: 'app-modulos-editar',
  templateUrl: './modulos-editar.component.html',
  styleUrls: ['./modulos-editar.component.css']
})
export class ModulosEditarComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private servicio: ModulosService,
    private dialogRef: MatDialogRef<ModulosEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  //variables locales
  moduloID: number = this.data.MODULOID;
  modulo: string = this.data.MODULO;
  descripcion: string = this.data.DESCRIPCION;

  ActualizarModulo() {
    if (this.modulo == "" || this.descripcion == "") {
      this.servicio.notificacion("Debe de llenar los campos del formulario");
      return;
    }
    this.servicio.update(this.moduloID, this.modulo, this.descripcion).subscribe(r => {
      var respuesta = this.authService.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.servicio.notificacion("El Modulo ha sido modificado correctamente")
        this.CloseDialog()
      } else {
        this.servicio.notificacion(respuesta.message)
      }

    })


  }

  ngOnInit(): void {

  }

  CloseDialog(): void {
    this.dialogRef.close()
  }

}
