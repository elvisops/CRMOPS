import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { PaisesService } from '../paises.service';

@Component({
  selector: 'app-paises-editar',
  templateUrl: './paises-editar.component.html',
  styleUrls: ['./paises-editar.component.css']
})
export class PaisesEditarComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private servicio: PaisesService,
    private dialogRef: MatDialogRef<PaisesEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

//variables locales
paisID:number=this.data.PAISID;
pais:string=this.data.PAIS;

ActualizarPais(){
  if(this.pais==""){
    this.servicio.notificacion("Debe de llenar los campos del formulario");
    return;
  }
   this.servicio.update(this.paisID,this.pais).subscribe(r =>{
   var respuesta = this.authService.desencriptar(r.response) 
   respuesta = JSON.parse(respuesta)
   respuesta = respuesta[0]
   if(respuesta.status==1){
    this.servicio.notificacion("El País ha sido modificado correctamente")
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
