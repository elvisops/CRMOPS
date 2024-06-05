import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SociosService } from '../../socios.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-prefijos',
  templateUrl: './prefijos.component.html',
  styleUrls: ['./prefijos.component.css']
})
export class PrefijosComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<PrefijosComponent>,
    private service: SociosService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  proyectoID: number = this.data.PROYECTOID
  carteraID: number = this.data.CARTERAID
  cartera: string = this.data.CARTERA
  prefijoID: number = this.data.PREFIJOID
  prefijo: string = this.data.PREFIJO

  // textoBoton: string = this.prefijo == "" ? 'Actualizar' : 'Agregar';
  textoBoton: string = this.prefijo == null ? 'Agregar' : 'Actualizar';


  ngOnInit(): void {
    // console.log(this.prefijo)
  }

  Actualizar(){

    // console.log('prefijoID: ',this.prefijoID)

    console.log('prefijo: ', this.prefijo)
    if (this.prefijo == "" || this.prefijo == null) {
      this.service.notificacion("El Prefijo es obligatorio")
      return
    }

    if (this.prefijoID == null || this.prefijoID == 0) {
      this.prefijoID = 0
    }

    this.service.updatePrefijo(this.prefijoID,this.prefijo, this.carteraID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      // console.log(respuesta)


      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.CloseDialog()
      }else{
        this.service.notificacion(respuesta.message)
      }
    })
  }

  CloseDialog(): void {
    this.dialogRef.close()
  }
}
