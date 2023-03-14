import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { SociosService } from '../socios.service';

@Component({
  selector: 'app-socios-editar',
  templateUrl: './socios-editar.component.html',
  styleUrls: ['./socios-editar.component.css']
})
export class SociosEditarComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private servicio: SociosService,
    private dialogRef: MatDialogRef<SociosEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

//variables locales
socioID:number=this.data.SOCIOID;
socio:string=this.data.SOCIO;
descripcion:string=this.data.DESCRIPCION;

ActualizarSocio(){
  if(this.socio=="" || this.descripcion ==""){
    this.servicio.notificacion("Debe de llenar los campos del formulario");
    return;
  }
   this.servicio.update(this.socioID,this.socio, this.descripcion).subscribe(r =>{
   var respuesta = this.authService.desencriptar(r.response) 
   respuesta = JSON.parse(respuesta)
   respuesta = respuesta[0]
   if(respuesta.status==1){
    this.servicio.notificacion("El Socio ha sido modificado correctamente")
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
