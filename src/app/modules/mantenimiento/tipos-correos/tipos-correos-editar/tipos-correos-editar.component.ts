import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { TiposCorreosService } from '../tipos-correos.service';

@Component({
  selector: 'app-tipos-correos-editar',
  templateUrl: './tipos-correos-editar.component.html',
  styleUrls: ['./tipos-correos-editar.component.css']
})
export class TiposCorreosEditarComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private servicio: TiposCorreosService,
    private dialogRef: MatDialogRef<TiposCorreosEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

//variables locales
tipocorreoID:number=this.data.TIPOCORREOID;
tipocorreo:string=this.data.TIPOCORREO;

ActualizarTcorreo(){
  if(this.tipocorreo==""){
    this.servicio.notificacion("Debe de llenar los campos del formulario");
    return;
  }
   this.servicio.update(this.tipocorreoID,this.tipocorreo).subscribe(r =>{
   var respuesta = this.authService.desencriptar(r.response) 
   respuesta = JSON.parse(respuesta)
   respuesta = respuesta[0]
   if(respuesta.status==1){
    this.servicio.notificacion("El Tipo de correo ha sido modificado correctamente")
    this.CloseDialog()
   }else{
    this.servicio.notificacion(respuesta.message)
   }
   
   })
  

}

ngOnInit(): void {
  
}

CloseDialog():void{
  this.dialogRef.close()
}
}
