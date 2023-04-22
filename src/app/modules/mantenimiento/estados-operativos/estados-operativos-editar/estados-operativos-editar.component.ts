import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstadosOperativosService } from '../estados-operativos.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-estados-operativos-editar',
  templateUrl: './estados-operativos-editar.component.html',
  styleUrls: ['./estados-operativos-editar.component.css']
})
export class EstadosOperativosEditarComponent implements OnInit{
  constructor(
    private auth:AuthService,
    private servicio:EstadosOperativosService,
    private dialogRef:MatDialogRef<EstadosOperativosEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  
  seleccion: boolean = this.data.DE_SISTEMA;
  estadoOperativo: string = this.data.ESTADOOPERATIVO;
  estadoOperativoID = this.data.ESTADOOPERATIVOID;
  carteraid: any = this.data.CARTERAID;
  estado: number = this.data.ESTADO;
  txtEstado = (this.estado)?"Activo":"Inactivo"

  ListaCarteras: any[] = []

  ngOnInit(): void {
    this.genListaCarteras()
  }

  genListaCarteras(){
    this.servicio.getListaCarteras().subscribe(r=>{
      var res = this.auth.desencriptar(r.data)
      this.ListaCarteras = JSON.parse(res)
    })
  }
  
  GuardarCambios(){
    if (this.estadoOperativo == "" || this.carteraid <1) {
      this.servicio.notificacion("Debe llenar los campos del formulario")
      return
    }
    
    const deSistema = Number(this.seleccion)
    this.estado = Number(this.estado)

    // alert(this.estadoOperativoID+" "+this.estadoOperativo+" "+this.carteraid+" "+ deSistema+" "+this.estado)
    // return

    this.servicio.Update(this.estadoOperativoID,this.estadoOperativo,this.carteraid, deSistema,this.estado).subscribe(r =>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.servicio.notificacion("Estado operativo actualizado con exito!")
        this.CloseDialog()
      }else{
        this.servicio.notificacion(respuesta.message)
        // this.service.notificacion("Error al actualizar")
      }
    })
  }
  CloseDialog(){
    this.dialogRef.close()
  }
}
