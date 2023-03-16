import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { SociosContactos } from '../../socios';
import { SociosService } from '../../socios.service';

@Component({
  selector: 'app-contacto-editar',
  templateUrl: './contacto-editar.component.html',
  styleUrls: ['./contacto-editar.component.css']
})
export class ContactoEditarComponent implements OnInit{

  constructor(
    private auth:AuthService,
    private service:SociosService,
    private dialogRef: MatDialogRef<ContactoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}
  

  ngOnInit(): void {
    
  }

  ActualizarContacto(){
    if(
      this.data.CORREO == "" || 
      this.data.NOMBRE == "" || 
      this.data.PUESTO=="" ||
      this.data.TELEFONO=="")
    {
      this.service.notificacion("No debe dejar campos vacios, por favor llene el formulario")
      return;
    }

    this.service.EditContacto(
      this.data.SOCIOCONTACTOID,
      this.data.NOMBRE,
      this.data.TELEFONO,
      this.data.CORREO,
      this.data.DESCRIPCION,
      this.data.PUESTO
    ).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.service.notificacion("Contacto modificado correctamente")
        this.CloseDialog()
      }else{
        this.service.notificacion(respuesta.message)
      }
    })

  }


  CloseDialog(){
    this.dialogRef.close()
  }
}
