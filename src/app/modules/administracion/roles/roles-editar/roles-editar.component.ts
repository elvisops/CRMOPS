import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-roles-editar',
  templateUrl: './roles-editar.component.html',
  styleUrls: ['./roles-editar.component.css']
})
export class RolesEditarComponent implements OnInit{

  constructor(
    private auth:AuthService,
    private servicio: RolesService,
    private dialogRef: MatDialogRef<RolesEditarComponent>,
    // private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  rolId:any = this.data.ROLID
  rol:string = this.data.ROL
  estado = (this.data.ESTADO==1)?true:false
  txtEstado = (this.estado)?"Activo":"Inactivo"
  descripcion:string = this.data.DESCRIPCION

  ngOnInit(): void{

  }



  ActualizarRol(){
    if(this.rol == "" || this.estado == undefined || this.descripcion == ""){
      this.servicio.notificacion("Debe de llenar los campos del formulario")
      return
    }
    this.servicio.Update(this.rolId,this.rol,this.estado,this.descripcion).subscribe(r =>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.servicio.notificacion("El permiso a sido modificado correctamente")
        this.CloseDialog();
      }else{
        this.servicio.notificacion(respuesta.message)
      }
    })
  }



  CloseDialog():void{
    this.dialogRef.close()
  }
}
