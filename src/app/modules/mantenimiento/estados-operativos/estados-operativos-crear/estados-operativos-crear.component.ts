import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstadosOperativosService } from '../estados-operativos.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-estados-operativos-crear',
  templateUrl: './estados-operativos-crear.component.html',
  styleUrls: ['./estados-operativos-crear.component.css']
})
export class EstadosOperativosCrearComponent implements OnInit {

  carteraid: number | string = ""
  seleccion: boolean = false
  estado: string = ""
  ListaCarteras: any[] = []
  constructor(
    private dialogRef: MatDialogRef<EstadosOperativosCrearComponent>,
    private service: EstadosOperativosService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  

  ngOnInit(): void {
    this.genListaCarteras()
  }

  genListaCarteras() {
    this.service.getListaCarteras().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaCarteras = JSON.parse(res)
    })
  }

  CrearEstadoOperativo() {
    if (this.estado == "" || this.carteraid == "") {
      this.service.notificacion("Debe llenar todos los campos del formulario")
      return;
    }

    const deSistema = Number(this.seleccion)

    this.service.Crear(this.estado, this.carteraid, deSistema).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      // console.log(respuesta)
      if (respuesta.status == 1) {
        this.data = respuesta.data
        this.resetForm()
        // this.service.notificacion("bien")
        this.service.notificacion(respuesta.message)
      } else {
        this.service.notificacion(respuesta.message)
        // this.service.notificacion("Error al registrar")
      }
    })
  }

  resetForm(){
    this.estado = "";
    this.carteraid = 0;
    this.seleccion = false;
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }
}
