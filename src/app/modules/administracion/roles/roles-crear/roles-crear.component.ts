import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Roles } from '../roles';

import { RolesService } from '../roles.service';

@Component({
  selector: 'app-roles-crear',
  templateUrl: './roles-crear.component.html',
  styleUrls: ['./roles-crear.component.css']
})
export class RolesCrearComponent {

  rol:string = ""
  descripcion:string = ""
  
  constructor(
    private dialogRef: MatDialogRef<RolesCrearComponent>,
    private service: RolesService,
    private auth:AuthService,
    // private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  CrearRol(){
    if(this.rol == "" || this.descripcion == "" ){
      this.service.notificacion("Debe llenar todos los campos del formulario")
      return
    }

    this.service.Crear(this.rol,this.descripcion).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      // console.log(respuesta)
      if (respuesta.status == 1) {
       this.data = respuesta.data
       this.resetForm();
       this.service.notificacion(respuesta.message)
      }else{
        this.service.notificacion(respuesta.message)
      }
    })
  }

  resetForm(){
    this.rol ="";
    this.descripcion ="";
  }
  CloseDialog():void{
    this.dialogRef.close()
  }
}
