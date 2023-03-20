import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { TiposDireccionesService } from '../tipos-direcciones.service';

@Component({
  selector: 'app-tipos-direcciones-editar',
  templateUrl: './tipos-direcciones-editar.component.html',
  styleUrls: ['./tipos-direcciones-editar.component.css']
})
export class TiposDireccionesEditarComponent implements OnInit{

  constructor(
    private dialogRef:MatDialogRef<TiposDireccionesEditarComponent>,
    private servicio: TiposDireccionesService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  // variables
  tipoDireccionId:number = this.data.TIPODIRECCIONID;
  tipo:string = this.data.TIPODIRECCION

  ngOnInit(): void {
    
  }

  ActualizarTipoDireccion(){
    if(this.tipo == ""){
      this.servicio.notificacion("Debe llenar el tipo de direccion")
      return
    }
    this.servicio.update(this.tipoDireccionId, this.tipo).subscribe( r => {
      var respuesta = this.authService.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.servicio.notificacion("Se ha actualizado el tipo de direccion")
        this.CloseDialog();
      }else{
        this.servicio.notificacion(respuesta.message)
      }
    })
  }

  CloseDialog():void{
    this.dialogRef.close();
  }
}
