import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { TiposTelefonosService } from '../tipos-telefonos.service';

@Component({
  selector: 'app-tipos-telefonos-editar',
  templateUrl: './tipos-telefonos-editar.component.html',
  styleUrls: ['./tipos-telefonos-editar.component.css']
})
export class TiposTelefonosEditarComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private servicio: TiposTelefonosService,
    private dialogRef:MatDialogRef<TiposTelefonosEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any  
  ){}

  //variables locales
  telefonoTipoID:number=this.data.TELEFONOTIPOID;
  tipo:string=this.data.TIPO;

  ngOnInit(): void {
    
  }

  ActualizarTipoTelefono(){
    if(this.tipo == ""){
      this.servicio.notificacion("Debe de llenar el tipo de telefono")
      return
    }
    this.servicio.update(this.telefonoTipoID,this.tipo).subscribe(r =>{
      var respuesta = this.authService.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.servicio.notificacion("El tipo de telefono ha sido modificado correctamente")
        this.CloseDialog()
      }
    })
  }

  CloseDialog():void{
    this.dialogRef.close()
  }
}
